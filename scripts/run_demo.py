#!/usr/bin/env python3
"""Run the MIT demo adapter without importing the upstream AI Judge core."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INPUT_PATH = ROOT / "examples" / "agent_output.json"
OUTPUT_PATH = ROOT / "examples" / "audit_report.json"


def normalize(text: str) -> str:
    return " ".join(text.lower().split())


def evaluate_claim(claim: dict, evidence_by_id: dict[str, dict]) -> dict:
    snippets = [
        evidence_by_id[evidence_id]["snippet"]
        for evidence_id in claim.get("evidence_ids", [])
        if evidence_id in evidence_by_id
    ]
    evidence_text = normalize(" ".join(snippets))
    support_keywords = [normalize(value) for value in claim.get("support_keywords", [])]
    contradiction_keywords = [
        normalize(value) for value in claim.get("contradiction_keywords", [])
    ]

    contradicted = any(keyword in evidence_text for keyword in contradiction_keywords)
    support_hits = [keyword for keyword in support_keywords if keyword in evidence_text]

    if contradicted:
        status = "contradicted"
        action = "route_to_human_review"
    elif support_keywords and len(support_hits) == len(support_keywords):
        status = "verified"
        action = "allow_with_trace"
    elif support_hits:
        status = "weakly_verified"
        action = "create_test_or_review_task"
    else:
        status = "unverifiable"
        action = "block_until_evidence_added"

    return {
        "claim_id": claim["id"],
        "claim": claim["text"],
        "status": status,
        "support_hits": support_hits,
        "evidence_ids": claim.get("evidence_ids", []),
        "failure_code": None
        if status == "verified"
        else claim.get("failure_code_if_unsupported"),
        "recommended_action": action,
    }


def build_report(payload: dict) -> dict:
    evidence_by_id = {item["id"]: item for item in payload["evidence"]}
    claim_results = [
        evaluate_claim(claim, evidence_by_id) for claim in payload["claims"]
    ]
    blocking = [
        result
        for result in claim_results
        if result["status"] in {"contradicted", "unverifiable", "weakly_verified"}
    ]

    return {
        "adapter": "ai-judge-uipath-agenthack",
        "run_id": payload["run_id"],
        "workflow_name": payload["workflow_name"],
        "overall_status": "human_review_required" if blocking else "allow_with_trace",
        "human_final_required": payload.get("human_final_required", True),
        "claim_results": claim_results,
        "uipath_test_cloud_actions": [
            {
                "type": "create_review_task",
                "claim_id": result["claim_id"],
                "reason": result["failure_code"],
            }
            for result in blocking
        ],
    }


def main() -> int:
    payload = json.loads(INPUT_PATH.read_text(encoding="utf-8"))
    report = build_report(payload)
    OUTPUT_PATH.write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"wrote {OUTPUT_PATH.relative_to(ROOT)}")
    print(f"overall_status={report['overall_status']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

