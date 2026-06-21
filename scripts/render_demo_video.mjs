import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const framesDir = join(root, "media", "frames");
const audioDir = join(root, "media", "audio");
const exportsDir = join(root, "media", "exports");
mkdirSync(framesDir, { recursive: true });
mkdirSync(audioDir, { recursive: true });
mkdirSync(exportsDir, { recursive: true });

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    const bundledModules =
      process.env.PLAYWRIGHT_NODE_MODULES ||
      "/Users/audimacmini/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
    return await import(pathToFileURL(join(bundledModules, "playwright", "index.mjs")).href);
  }
}

const auditReport = JSON.parse(readFileSync(join(root, "examples", "audit_report.json"), "utf8"));
const contradictedClaim = auditReport.claim_results.find((claim) => claim.status === "contradicted");
const reviewAction = auditReport.uipath_test_cloud_actions[0];

const slides = [
  {
    kicker: "UiPath AgentHack | Track 3: Test Cloud",
    title: "AI Judge for Agentic Test Governance",
    body: "Turn polished agentic automation output into claim-level review gates before release.",
    sideTitle: "Demo outcome",
    bullets: ["Agent output audited", "Unsupported claim isolated", "Test Cloud review task proposed", "Human final signoff preserved"],
    duration: 11
  },
  {
    kicker: "The risk",
    title: "Agent summaries can sound ready while overclaiming evidence.",
    body: "A release-readiness agent says the automation will reduce manual QA time by 80%. The supplied pilot evidence only supports 30-40%.",
    sideTitle: "Input claim",
    bullets: ["Target decision: release_go_no_go", "Claim: reduce manual QA by 80%", "Evidence: pilot suggests 30-40%", "Risk: quantified overclaim"],
    duration: 16
  },
  {
    kicker: "The workflow",
    title: "UiPath output becomes a claim/evidence packet.",
    body: "The adapter keeps raw agent output separate from evidence snippets, then checks each claim against the evidence attached to it.",
    sideTitle: "Packet fields",
    bullets: ["workflow_name", "agent_output.summary", "claims[]", "evidence[]", "human_final_required"],
    duration: 15
  },
  {
    kicker: "Local demo run",
    title: "The adapter generates a deterministic audit report.",
    body: "The public repo runs with Python standard library only, making the hackathon demo easy to inspect and rerun.",
    terminal: ["$ python3 scripts/run_demo.py", "wrote examples/audit_report.json", "overall_status=human_review_required"],
    sideTitle: "Public repo",
    bullets: ["github.com/reguorider-gif/ai-judge-uipath-agenthack", "MIT adapter layer", "Upstream AI Judge kept separate"],
    duration: 15
  },
  {
    kicker: "Audit result",
    title: "Three claims pass. One claim is contradicted.",
    body: "AI Judge does not block everything. It preserves traceable claims and routes the risky quantified claim to review.",
    results: auditReport.claim_results,
    duration: 18
  },
  {
    kicker: "UiPath Test Cloud action",
    title: "Risky claims become review work, not silent release assumptions.",
    body: "The contradicted claim emits a Test Cloud-oriented review task contract. This is the quality gate where a generated workflow becomes governed automation.",
    sideTitle: "Generated action",
    bullets: [`type: ${reviewAction.type}`, `claim_id: ${reviewAction.claim_id}`, `reason: ${reviewAction.reason}`, "recommended: route_to_human_review"],
    duration: 16
  },
  {
    kicker: "Human-final governance",
    title: "Agents draft. Evidence decides. Humans sign off.",
    body: "The final state is not an automatic rejection. It is a controlled pause: show the weak evidence, create a task, and keep the human approver in the loop.",
    sideTitle: "Final status",
    bullets: [`overall_status: ${auditReport.overall_status}`, `human_final_required: ${auditReport.human_final_required}`, "release decision: pending review", "next: Automation Cloud flow integration"],
    duration: 16
  },
  {
    kicker: "What is next",
    title: "Connect the contract to a real UiPath tenant.",
    body: "After UiPath Labs access is granted, the demo contract can be wired into Automation Cloud and Test Cloud so agentic workflow claims generate real review tasks.",
    sideTitle: "Submission links",
    bullets: ["Repo: reguorider-gif/ai-judge-uipath-agenthack", "Live upstream demo: Hugging Face Space", "Track: UiPath Test Cloud", "Goal: governed agentic testing"],
    duration: 13
  }
];

const narration = `AI Judge for Agentic Test Governance is a UiPath AgentHack submission for Track 3, Test Cloud.

The problem is simple. Agentic automation can write release summaries, test summaries, and operational recommendations that sound complete, even when the evidence is weak. In this demo, a release-readiness agent says the automation will reduce manual QA time by eighty percent. But the pilot evidence only supports a thirty to forty percent reduction.

The UiPath-oriented adapter turns that output into a claim and evidence packet. The raw agent summary stays separate from evidence snippets. Each claim carries the evidence it depends on, plus a failure code for what should happen when the claim is unsupported or contradicted.

The public demo repo runs locally with Python standard library only. Running python three scripts slash run demo dot p y writes examples slash audit report dot json and returns overall status human review required.

The result is intentionally narrow and inspectable. Three claims are verified: the claims audit passed, fragile tests were reviewed, and a human approver must sign off. One claim is contradicted: the eighty percent manual-QA reduction claim conflicts with the thirty to forty percent pilot note.

That contradicted claim becomes UiPath Test Cloud work. The adapter emits a create review task action for claim zero zero three with reason overclaimed quantified effect. Instead of letting a polished agent summary become a release decision, the workflow creates a visible review gate.

The product principle is human-final governance. Agents draft and summarize. Evidence decides what is supported. Humans keep the final signoff before publication or release.

The next step is to connect this contract to a real UiPath Automation Cloud and Test Cloud tenant, so agent-created claims can generate review tasks and test ideas automatically.`;

const html = (slide, index) => `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    :root {
      color-scheme: dark;
      --bg: #07120f;
      --panel: #0d201b;
      --panel-2: #112b24;
      --ink: #f2fbf7;
      --muted: #a7beb6;
      --green: #38e38f;
      --cyan: #5cc8ff;
      --amber: #ffc857;
      --red: #ff6b6b;
    }
    * { box-sizing: border-box; }
    body {
      width: 1920px;
      height: 1080px;
      margin: 0;
      overflow: hidden;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at 18% 12%, rgba(56, 227, 143, 0.20), transparent 26%),
        radial-gradient(circle at 82% 20%, rgba(92, 200, 255, 0.18), transparent 28%),
        linear-gradient(135deg, #05100d 0%, #091712 45%, #10231d 100%);
      color: var(--ink);
    }
    .frame {
      width: 100%;
      height: 100%;
      padding: 76px 92px;
      display: grid;
      grid-template-columns: 1.08fr 0.92fr;
      gap: 54px;
      position: relative;
    }
    .brand {
      position: absolute;
      top: 40px;
      left: 92px;
      right: 92px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--muted);
      font-size: 27px;
      letter-spacing: 0;
    }
    .brand strong { color: var(--ink); font-weight: 760; }
    .main {
      align-self: center;
      padding-top: 24px;
    }
    .kicker {
      color: var(--green);
      text-transform: uppercase;
      font-size: 28px;
      font-weight: 780;
      margin-bottom: 34px;
    }
    h1 {
      font-size: 88px;
      line-height: 0.98;
      margin: 0 0 34px;
      letter-spacing: 0;
      max-width: 980px;
    }
    .body {
      font-size: 38px;
      line-height: 1.24;
      color: #d6e8e1;
      max-width: 980px;
    }
    .panel {
      align-self: center;
      background: linear-gradient(180deg, rgba(17,43,36,0.98), rgba(9,23,18,0.98));
      border: 1px solid rgba(167,190,182,0.24);
      border-radius: 8px;
      padding: 48px;
      min-height: 670px;
      box-shadow: 0 22px 80px rgba(0, 0, 0, 0.38);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 28px;
    }
    .panel h2 {
      margin: 0;
      font-size: 42px;
      letter-spacing: 0;
    }
    .bullets {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 22px;
    }
    .bullets li {
      display: grid;
      grid-template-columns: 34px 1fr;
      gap: 18px;
      font-size: 30px;
      line-height: 1.25;
      color: #e8f5f0;
    }
    .bullets li::before {
      content: "";
      width: 18px;
      height: 18px;
      border-radius: 50%;
      margin-top: 9px;
      background: var(--green);
      box-shadow: 0 0 24px rgba(56, 227, 143, 0.6);
    }
    .terminal {
      background: #020706;
      border: 1px solid rgba(92,200,255,0.28);
      border-radius: 8px;
      padding: 30px;
      display: grid;
      gap: 14px;
      color: #cdfde7;
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 29px;
      line-height: 1.3;
    }
    .results {
      display: grid;
      gap: 17px;
    }
    .result {
      background: rgba(255,255,255,0.045);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px;
      padding: 18px 20px;
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 18px;
      align-items: start;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      border-radius: 6px;
      padding: 8px 12px;
      font-weight: 800;
      font-size: 20px;
      color: #08100d;
      background: var(--green);
      text-transform: uppercase;
    }
    .badge.contradicted {
      background: var(--red);
      color: white;
    }
    .claim {
      font-size: 25px;
      line-height: 1.22;
      color: #eef9f5;
    }
    .footer {
      position: absolute;
      left: 92px;
      right: 92px;
      bottom: 42px;
      display: flex;
      justify-content: space-between;
      color: var(--muted);
      font-size: 24px;
    }
  </style>
</head>
<body>
  <div class="brand"><span><strong>AI Judge</strong> for UiPath AgentHack</span><span>Track 3: Test Cloud</span></div>
  <main class="frame">
    <section class="main">
      <div class="kicker">${escapeHtml(slide.kicker)}</div>
      <h1>${escapeHtml(slide.title)}</h1>
      <div class="body">${escapeHtml(slide.body)}</div>
    </section>
    <aside class="panel">
      ${slide.terminal ? `<div class="terminal">${slide.terminal.map((line) => `<div>${escapeHtml(line)}</div>`).join("")}</div>` : ""}
      ${slide.results ? `<div class="results">${slide.results.map((result) => `<div class="result"><span class="badge ${result.status}">${escapeHtml(result.status)}</span><div class="claim">${escapeHtml(result.claim)}</div></div>`).join("")}</div>` : ""}
      ${slide.sideTitle ? `<h2>${escapeHtml(slide.sideTitle)}</h2>` : ""}
      ${slide.bullets ? `<ul class="bullets">${slide.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
    </aside>
  </main>
  <div class="footer"><span>Public repo: github.com/reguorider-gif/ai-judge-uipath-agenthack</span><span>${index + 1} / ${slides.length}</span></div>
</body>
</html>`;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const { chromium } = await loadPlaywright();
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({
  headless: true,
  executablePath: existsSync(chromePath) ? chromePath : undefined
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });

for (const [index, slide] of slides.entries()) {
  await page.setContent(html(slide, index), { waitUntil: "networkidle" });
  await page.screenshot({ path: join(framesDir, `slide-${String(index + 1).padStart(2, "0")}.png`) });
}
await browser.close();

const narrationPath = join(audioDir, "narration.txt");
const audioPath = join(audioDir, "narration.aiff");
const concatPath = join(framesDir, "concat.txt");
const videoOnlyPath = join(exportsDir, "ai-judge-uipath-agenthack-demo-video-only.mp4");
const finalPath = join(exportsDir, "ai-judge-uipath-agenthack-demo.mp4");

writeFileSync(narrationPath, narration);
execFileSync("say", ["-v", "Samantha", "-r", "175", "-o", audioPath, "-f", narrationPath], { stdio: "inherit" });

const concatLines = [];
for (const [index, slide] of slides.entries()) {
  concatLines.push(`file '${join(framesDir, `slide-${String(index + 1).padStart(2, "0")}.png`).replace(/'/g, "'\\''")}'`);
  concatLines.push(`duration ${slide.duration}`);
}
concatLines.push(`file '${join(framesDir, `slide-${String(slides.length).padStart(2, "0")}.png`).replace(/'/g, "'\\''")}'`);
writeFileSync(concatPath, `${concatLines.join("\n")}\n`);

execFileSync("ffmpeg", [
  "-y",
  "-f",
  "concat",
  "-safe",
  "0",
  "-i",
  concatPath,
  "-vf",
  "format=yuv420p",
  "-r",
  "30",
  "-movflags",
  "+faststart",
  videoOnlyPath
], { stdio: "inherit" });

execFileSync("ffmpeg", [
  "-y",
  "-i",
  videoOnlyPath,
  "-i",
  audioPath,
  "-c:v",
  "copy",
  "-c:a",
  "aac",
  "-b:a",
  "160k",
  "-movflags",
  "+faststart",
  finalPath
], { stdio: "inherit" });

console.log(finalPath);
