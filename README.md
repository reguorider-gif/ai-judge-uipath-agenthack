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

## UiPath Components Used

This submission is mapped to **UiPath AgentHack Track 3: UiPath Test Cloud**.

The live hackathon environment used for the Devpost submission is:

```text
https://cloud.uipath.com/aijudgeagenthack/DefaultTenant/testmanager_/AIJ/dashboard
```

UiPath components used or targeted by this adapter:

- UiPath Automation Cloud Community organization: `aijudgeagenthack`
- Tenant: `DefaultTenant`
- UiPath Test Manager / Test Cloud project: `AI Judge AgentHack`
- Project prefix: `AIJ`
- Test Cloud-oriented routing contract: `uipath/test-cloud-contract.json`

The intended Test Cloud flow is:

```text
agentic automation output
  -> AI Judge claim/evidence audit
  -> unsupported claims become Test Manager review items
  -> human signoff before release or publication
```

## Agent Type

This is a **coded governance adapter for agentic automation output**.

It does not package a UiPath low-code agent. Instead, the repo models the output of an agentic workflow in `examples/agent_output.json`, runs deterministic coded validation in `scripts/run_demo.py`, and maps the result into a UiPath Test Manager/Test Cloud review gate. If extended inside UiPath, this adapter is intended to sit after a UiPath Coded Agent or another agentic automation step and before final release approval.

## Setup Instructions

1. Clone the public repo.

```bash
git clone https://github.com/reguorider-gif/ai-judge-uipath-agenthack.git
cd ai-judge-uipath-agenthack
```

2. Run the deterministic local demo.

```bash
python3 scripts/run_demo.py
```

3. Inspect the generated report.

```bash
cat examples/audit_report.json
```

4. In UiPath Automation Cloud, open Test Manager and create or select the project:

```text
Organization: aijudgeagenthack
Tenant: DefaultTenant
Project: AI Judge AgentHack
Prefix: AIJ
```

5. Use `uipath/test-cloud-contract.json` to map unsupported or overclaimed AI output into Test Manager review items, test cases, or release gates.

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
