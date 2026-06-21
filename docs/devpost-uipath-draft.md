# Devpost Draft: UiPath AgentHack

## Project Title

AI Judge for Agentic Test Governance

## Track

Track 3: UiPath Test Cloud

## Tagline

Turn agentic automation output into claim-level test and review gates before release.

## Description

AI Judge for Agentic Test Governance is a UiPath AgentHack adapter that audits AI-generated automation outputs before they become release decisions, customer answers, or operational actions.

In the demo flow, a UiPath-orchestrated agent produces a release-readiness summary. The adapter breaks that summary into claim spans, checks each claim against supplied evidence, detects unsupported or overclaimed statements, and emits a report that can create Test Cloud review tasks or require human signoff.

The point is not to replace human judgment. The point is to make weak evidence, overclaimed metrics, and missing review steps visible before an agentic workflow is trusted.

## What It Does

- Accepts a UiPath-flavored agent output packet.
- Separates raw agent output from evidence snippets.
- Checks claim support deterministically in the demo runner.
- Flags `verified`, `weakly_verified`, `unverifiable`, and `contradicted` claims.
- Routes risky claims into review tasks.
- Preserves a human-final release gate.

## Built With

- UiPath Automation Cloud
- UiPath Test Cloud
- Python 3 standard library demo adapter
- JSON claim/evidence packets
- AI Judge upstream project: https://github.com/reguorier/ai-judge
- AI Judge live demo: https://huggingface.co/spaces/reguorier/ai-judge-citation-audit
- Codex for hackathon scaffolding and submission drafting

## Demo Video Outline

| Time | Shot | Message |
|---:|---|---|
| 0:00-0:30 | Risky agent output | Agent summaries can sound ready while overclaiming evidence. |
| 0:30-1:15 | UiPath flow | Automation output becomes a claim/evidence packet. |
| 1:15-2:15 | Adapter run | `python3 scripts/run_demo.py` writes `examples/audit_report.json`. |
| 2:15-3:15 | Report result | The 80% manual-QA reduction claim is contradicted by 30-40% pilot evidence. |
| 3:15-4:15 | Test Cloud action | Risky claims become review tasks or new tests. |
| 4:15-5:00 | Human gate | Human approver keeps the final decision. |

## Public Repo Setup Instructions

```bash
git clone https://github.com/reguorider-gif/ai-judge-uipath-agenthack.git
cd ai-judge-uipath-agenthack
python3 scripts/run_demo.py
cat examples/audit_report.json
```

## Submission Checklist

- Public GitHub repo under MIT license.
- Demo video no longer than 5 minutes.
- Screenshot of `examples/audit_report.json`.
- UiPath Automation Cloud / Test Cloud flow proof after tenant access is available.
- Deck link with public viewing enabled.
- Final Devpost submission reviewed by project owner.
