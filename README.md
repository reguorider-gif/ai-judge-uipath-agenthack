# AI Judge for Agentic Test Governance

MIT-licensed UiPath AgentHack adapter/demo repo for AI Judge.

This repository is a small hackathon submission layer for **UiPath AgentHack - Track 3: UiPath Test Cloud**. It demonstrates how an agentic automation output can be routed through a claim-support quality gate before a release, business decision, or customer-facing answer is accepted.

Public hackathon repo:

```text
https://github.com/reguorider-gif/ai-judge-uipath-agenthack
```

## Why This Exists

AI agents can produce polished plans, test summaries, release notes, and customer answers that sound complete while still containing unsupported claims. AI Judge adds a human-final report gate:

```text
UiPath automation output
  -> claim/evidence audit
  -> unsupported or overclaimed claims become tests or review tasks
  -> human signoff before publish or release
```

## License Boundary

This repo is MIT licensed and contains only the hackathon adapter/demo layer.

The upstream AI Judge core project is separate:

- Main project: https://github.com/reguorier/ai-judge
- Current main-project license: Business Source License 1.1
- Live demo: https://huggingface.co/spaces/reguorier/ai-judge-citation-audit

The adapter is designed so a hackathon submission can satisfy MIT/Apache repository requirements without changing the upstream AI Judge license.

## What Is Included

| Path | Purpose |
|---|---|
| `scripts/run_demo.py` | Deterministic local demo runner using Python standard library only. |
| `scripts/render_demo_video.mjs` | Generates the Devpost demo MP4 from local repo data and storyboard frames. |
| `examples/agent_output.json` | Sample UiPath-flavored agent output with claim/evidence data. |
| `examples/audit_report.json` | Generated report output from the demo runner. |
| `uipath/test-cloud-contract.json` | Data contract for Test Cloud-oriented routing. |
| `uipath/maestro-case-contract.json` | Data contract for case-flow routing. |
| `docs/architecture.md` | Architecture and integration boundaries. |
| `docs/devpost-uipath-draft.md` | Devpost project page draft and video outline. |
| `docs/devpost-preferences-to-fill.md` | Manual Devpost profile values when browser automation is blocked. |

## Run The Demo

```bash
python3 scripts/run_demo.py
```

Expected output:

```text
wrote examples/audit_report.json
overall_status=human_review_required
```

## Render The Devpost Demo Video

Requires Node.js, Playwright, ffmpeg, and macOS `say`.

```bash
node scripts/render_demo_video.mjs
```

The script renders storyboard frames under `media/frames/`, narration under `media/audio/`, and the final MP4 under `media/exports/`.

## UiPath AgentHack Track

Recommended track:

```text
Track 3: UiPath Test Cloud
```

The demo maps AI Judge into Test Cloud as a quality gate for:

- generated test scenarios
- agent-created release summaries
- automation breakage explanations
- requirements-to-tests conversion
- AI-infused workflow validation
- human-in-the-loop review decisions

## Submission State

This local repo is ready to become a public GitHub hackathon adapter repo after the owner approves:

1. GitHub public repo creation at `https://github.com/reguorider-gif/ai-judge-uipath-agenthack`.
2. Any UiPath Labs credentials or tenant details.
3. Final Devpost submission.
