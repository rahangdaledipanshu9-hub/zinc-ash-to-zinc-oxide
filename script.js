/* ============================================================
   ZnO Recovery Protocol — App Logic
   JAMP Industries | Hydrometallurgical Process Guide
   ============================================================ */

// ── PROCESS STEPS DATA ────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    name: "Hot Water Dechlorination",
    shortName: "Dechlorination",
    duration: 45 * 60,        // 45 min × 2 = 45 min per wash (showing 45 min for first wash timer)
    durationLabel: "45 min × 2 washes",
    reaction: null,
    objective: "Remove chloride salts prior to acid leaching to prevent formation of ZnCl₂ complexes. Undissolved ZnCl₂ in the feed would interfere with downstream precipitation and reduce final purity.",
    conditions: [
      { label: "L/S Ratio",    value: "10 : 1",   hot: false },
      { label: "Water Vol.",   value: "500 mL",   hot: false },
      { label: "Temperature",  value: "85 °C",    hot: true  },
      { label: "Duration",     value: "45 min",   hot: false },
      { label: "No. of Washes",value: "× 2",      hot: false },
      { label: "Total Water",  value: "1000 mL",  hot: false },
    ],
    massBalance: [
      { key: "Cl-salts removed (90%)",  val: "12.96 g" },
      { key: "Remaining Cl",            val: "1.44 g"  },
      { key: "Residue after washing",   val: "37.04 g" },
    ],
    note: "R&D NOTE: If a significant fraction of zinc is present as ZnCl₂, it will dissolve during washing, reducing overall recovery. Analyse wash liquors for zinc before discarding.",
    paramsHighlight: [
      { k: "Water per wash",    v: "500 mL" },
      { k: "Temperature",       v: "85 °C"  },
      { k: "Time per wash",     v: "45 min" },
      { k: "Cl removed",        v: "12.96 g"},
    ]
  },
  {
    id: 2,
    name: "Sulfuric Acid Leaching",
    shortName: "H₂SO₄ Leach",
    duration: 120 * 60,       // 2 hours
    durationLabel: "2 hours",
    reaction: "ZnO + H₂SO₄ → ZnSO₄ + H₂O",
    objective: "Dissolve ZnO from the dechlorinated residue into an aqueous ZnSO₄ solution using dilute sulfuric acid. The leach solution is then filtered and taken forward to purification.",
    conditions: [
      { label: "Conc. H₂SO₄",   value: "25.5 mL",  hot: false },
      { label: "Dilute to",      value: "250 mL",   hot: false },
      { label: "Temperature",    value: "70 °C",    hot: true  },
      { label: "Duration",       value: "2 h",      hot: false },
      { label: "Stirring",       value: "500 rpm",  hot: false },
      { label: "H₂SO₄ purity",   value: "98%",      hot: false },
    ],
    massBalance: [
      { key: "ZnO present",             val: "34.70 g" },
      { key: "Stoichio. H₂SO₄ req.",    val: "41.8 g"  },
      { key: "With 10% excess",         val: "46.0 g"  },
      { key: "Vol. of 98% H₂SO₄",       val: "25.5 mL" },
    ],
    note: "SAFETY: Always add acid to water slowly. Never add water to concentrated acid. Use PPE — acid resistant gloves, lab coat, and face shield.",
    paramsHighlight: [
      { k: "H₂SO₄ volume",  v: "25.5 mL" },
      { k: "Diluted volume", v: "250 mL"  },
      { k: "Leach temp.",    v: "70 °C"   },
      { k: "Leach time",     v: "2 hours" },
    ]
  },
  {
    id: 3,
    name: "Filtration of Leach Residue",
    shortName: "Hot Filtration",
    duration: 0,              // No timer — manual step
    durationLabel: "Manual step",
    reaction: null,
    objective: "Filter while hot to remove undissolved solids — mainly SiO₂, Al₂O₃, and some Pb compounds. Collect the clear ZnSO₄ filtrate for downstream purification. Discard or set aside the residue.",
    conditions: [
      { label: "Filter state",  value: "While HOT",  hot: true  },
      { label: "Residue est.",  value: "0.3–0.5 g",  hot: false },
      { label: "Target",        value: "Clear filtrate", hot: false },
    ],
    massBalance: [
      { key: "Filter residue (SiO₂, Al₂O₃, Pb)", val: "~0.3–0.5 g" },
      { key: "ZnSO₄ filtrate retained",           val: "~249 mL"    },
    ],
    note: "Filter while the solution is still hot (above 60 °C) to ensure SiO₂ and other gelatinous residues pass through the filter efficiently without clogging.",
    paramsHighlight: [
      { k: "Residue mass",  v: "0.3–0.5 g" },
      { k: "Filter at",     v: "> 60 °C"   },
      { k: "Collect",       v: "Filtrate"  },
    ]
  },
  {
    id: 4,
    name: "Iron Removal",
    shortName: "Fe Removal",
    duration: 0,
    durationLabel: "Manual step",
    reaction: "Fe³⁺ + 3OH⁻ → Fe(OH)₃ ↓",
    objective: "Selectively precipitate dissolved iron as Fe(OH)₃ by raising the solution pH from ~2 to 4.5 using dilute NaOH. Filter off the brown precipitate before proceeding to lead removal.",
    conditions: [
      { label: "Fe₂O₃ in feed", value: "0.25 g",    hot: false },
      { label: "Reagent",       value: "10% NaOH",  hot: false },
      { label: "NaOH amount",   value: "1–2 g",     hot: false },
      { label: "Target pH",     value: "4.5",       hot: false, warn: true },
      { label: "Stirring",      value: "Constant",  hot: false },
    ],
    massBalance: [
      { key: "Fe₂O₃ in feed",        val: "0.25 g"  },
      { key: "NaOH to raise to pH 4.5", val: "~1–2 g" },
      { key: "Fe(OH)₃ precipitated",  val: "~0.29 g" },
    ],
    note: "Add NaOH very slowly with constant stirring to avoid local over-neutralisation, which could co-precipitate zinc as Zn(OH)₂ and reduce yield.",
    paramsHighlight: [
      { k: "Start pH",   v: "~2"        },
      { k: "Target pH",  v: "4.5"       },
      { k: "NaOH conc.", v: "10% soln." },
      { k: "Fe removed", v: "~0.29 g"   },
    ]
  },
  {
    id: 5,
    name: "Lead Removal",
    shortName: "Pb Removal",
    duration: 0,
    durationLabel: "Manual step",
    reaction: "Pb²⁺ + SO₄²⁻ → PbSO₄ ↓",
    objective: "Precipitate residual lead ions as insoluble lead sulfate (PbSO₄) by adding sodium sulfate to the filtered ZnSO₄ solution. Filter and discard the PbSO₄ precipitate as hazardous waste.",
    conditions: [
      { label: "Reagent",     value: "Na₂SO₄",   hot: false },
      { label: "Amount",      value: "0.5 g",    hot: false },
      { label: "PbO in feed", value: "0.089 g",  hot: false },
    ],
    massBalance: [
      { key: "PbO in feed",      val: "0.089 g" },
      { key: "Na₂SO₄ added",     val: "0.5 g"   },
      { key: "PbSO₄ precipitated", val: "~0.10 g" },
    ],
    note: "PbSO₄ precipitate is a hazardous material. Handle and dispose according to local environmental regulations. Do not pour down drain.",
    paramsHighlight: [
      { k: "Na₂SO₄ dose",   v: "0.5 g"  },
      { k: "Pb removed as", v: "PbSO₄"  },
      { k: "Dispose as",    v: "Haz. waste" },
    ]
  },
  {
    id: 6,
    name: "Zinc Hydroxide Precipitation",
    shortName: "Zn(OH)₂ Precip.",
    duration: 0,
    durationLabel: "Manual step",
    reaction: "ZnSO₄ + 2NaOH → Zn(OH)₂ ↓ + Na₂SO₄",
    objective: "Precipitate zinc as Zn(OH)₂ by carefully adding 10% NaOH solution to the purified ZnSO₄ filtrate. Maintain final pH between 8.8 and 9.0 to ensure complete precipitation while avoiding re-dissolution of zinc hydroxide.",
    conditions: [
      { label: "NaOH required", value: "34.1 g",  hot: false },
      { label: "As 10% soln.",  value: "~340 mL", hot: false },
      { label: "Final pH",      value: "8.8–9.0", hot: false, warn: true },
      { label: "n(ZnO)",        value: "0.426 mol", hot: false },
      { label: "n(NaOH)",       value: "0.852 mol", hot: false },
    ],
    massBalance: [
      { key: "n(ZnO)",                 val: "0.426 mol" },
      { key: "NaOH required",          val: "34.1 g"    },
      { key: "As 10% NaOH solution",   val: "~340 mL"   },
      { key: "Zn(OH)₂ precipitate est.", val: "~42.3 g" },
    ],
    note: "Target pH is critical: below 8.8 precipitation is incomplete; above 9.5 zinc hydroxide begins to re-dissolve as [Zn(OH)₄]²⁻ (zincate ion). Monitor pH continuously.",
    paramsHighlight: [
      { k: "NaOH total",  v: "34.1 g"   },
      { k: "Solution vol.", v: "340 mL"  },
      { k: "pH target",   v: "8.8–9.0"  },
      { k: "Zn(OH)₂ est.", v: "42.3 g"  },
    ]
  },
  {
    id: 7,
    name: "Filtration of Zn(OH)₂",
    shortName: "Filter Precipitate",
    duration: 0,
    durationLabel: "Manual step",
    reaction: null,
    objective: "Filter the Zn(OH)₂ precipitate from the sodium sulfate mother liquor. Collect the wet cake on a Büchner funnel with vacuum filtration. Note the wet cake mass before washing.",
    conditions: [
      { label: "Product",      value: "Zn(OH)₂ cake", hot: false },
      { label: "Expected mass",value: "~42.3 g",      hot: false },
      { label: "Method",       value: "Büchner / vacuum", hot: false },
    ],
    massBalance: [
      { key: "Zn(OH)₂ theoretical yield", val: "42.3 g" },
    ],
    note: "Collect and retain the wet Zn(OH)₂ cake. The mother liquor (Na₂SO₄ solution) may be discarded or treated for sulfate recovery.",
    paramsHighlight: [
      { k: "Wet cake mass", v: "~42.3 g" },
      { k: "Filtration",    v: "Vacuum"  },
    ]
  },
  {
    id: 8,
    name: "Cake Washing",
    shortName: "Washing × 3",
    duration: 0,
    durationLabel: "Manual step",
    reaction: null,
    objective: "Wash the Zn(OH)₂ cake three times with deionised water to remove residual sodium sulfate and sodium ions. Continue washing until the filtrate pH reaches approximately 7 and conductivity is low.",
    conditions: [
      { label: "Wash cycles",   value: "× 3",       hot: false },
      { label: "Water per wash",value: "150 mL",    hot: false },
      { label: "Total water",   value: "450 mL",    hot: false },
      { label: "Target pH",     value: "~7",        hot: false, warn: true },
      { label: "Target cond.",  value: "Low (<100 µS)", hot: false },
    ],
    massBalance: [
      { key: "Wash water total", val: "450 mL" },
      { key: "Na⁺ / SO₄²⁻ removed", val: "~trace" },
    ],
    note: "Use fresh deionised water for each wash cycle. If pH does not reach 7 after 3 washes, perform a 4th wash. High residual Na can impair final ZnO purity.",
    paramsHighlight: [
      { k: "Washes",       v: "3×"      },
      { k: "Water / wash", v: "150 mL"  },
      { k: "Stop when",    v: "pH ≈ 7"  },
    ]
  },
  {
    id: 9,
    name: "Drying",
    shortName: "Drying 105 °C",
    duration: 12 * 60 * 60,   // 12 hours
    durationLabel: "12 hours",
    reaction: null,
    objective: "Dry the washed Zn(OH)₂ cake in an oven at 105 °C to remove all moisture before calcination. The dried mass should be between 40–42 g.",
    conditions: [
      { label: "Temperature", value: "105 °C",  hot: true  },
      { label: "Duration",    value: "12 h",    hot: false },
      { label: "Expected dry mass", value: "40–42 g", hot: false },
    ],
    massBalance: [
      { key: "Wet cake input",   val: "~42.3 g" },
      { key: "Expected dry mass", val: "40–42 g" },
      { key: "Moisture removed", val: "~0.3–2 g" },
    ],
    note: "Do not exceed 150 °C during drying as partial conversion to ZnO may occur, affecting the subsequent calcination mass balance.",
    paramsHighlight: [
      { k: "Oven temp.",   v: "105 °C"  },
      { k: "Dry time",     v: "12 h"    },
      { k: "Expected mass", v: "40–42 g" },
    ]
  },
  {
    id: 10,
    name: "Calcination → ZnO",
    shortName: "Calcination",
    duration: 150 * 60,        // 2.5 hours
    durationLabel: "2.5 hours",
    reaction: "Zn(OH)₂ → ZnO + H₂O  (Δ 500 °C)",
    objective: "Convert dried Zn(OH)₂ to high-purity ZnO by calcination at 500 °C in a muffle furnace. Ramp at 5 °C/min to avoid thermal shock. Final ZnO product purity is 97–99%.",
    conditions: [
      { label: "Temperature",  value: "500 °C",     hot: true  },
      { label: "Duration",     value: "2.5 h",      hot: false },
      { label: "Heating rate", value: "5 °C/min",   hot: true  },
      { label: "Atmosphere",   value: "Air",        hot: false },
      { label: "Target purity",value: "97–99%",     hot: false },
    ],
    massBalance: [
      { key: "Zn(OH)₂ input",       val: "40–42 g" },
      { key: "ZnO theoretical",      val: "34.7 g"  },
      { key: "ZnO conservative (90%)", val: "31.2 g" },
      { key: "ZnO optimistic (95%)",   val: "33.0 g" },
    ],
    note: "The heating rate of 5 °C/min is critical. Rapid heating causes local hot-spots, particle sintering, and reduced surface area of the final ZnO product.",
    paramsHighlight: [
      { k: "Calcin. temp.",   v: "500 °C"   },
      { k: "Hold time",       v: "2.5 h"    },
      { k: "Ramp rate",       v: "5 °C/min" },
      { k: "Final ZnO yield", v: "31–33 g"  },
    ]
  }
];

// ── STATE ──────────────────────────────────────────────────────
let state = {
  started: false,
  currentStep: 0,        // 0 = intro; 1-10 = steps
  stepStates: {},        // { stepId: 'locked'|'unlocked'|'timer-running'|'completed' }
  timers: {},            // { stepId: { intervalId, remaining, total } }
};

const TIMER_RING_RADIUS = 70;
const TIMER_RING_CIRCUMFERENCE = 2 * Math.PI * TIMER_RING_RADIUS;

// Initialize step states
STEPS.forEach(s => { state.stepStates[s.id] = 'locked'; });

// ── INIT ────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initBackground();
  renderPipelineLabels();
  renderStepIndex();
  updatePipeline();
});

// ── BACKGROUND CANVAS ──────────────────────────────────────────
function initBackground() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, dots;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    createDots();
  }

  function createDots() {
    dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));
  }

  function drawGrid() {
    ctx.strokeStyle = 'rgba(0,245,255,0.04)';
    ctx.lineWidth = 1;
    const spacing = 50;
    for (let x = 0; x < W; x += spacing) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += spacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
      if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,245,255,${d.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
}

// ── PIPELINE ───────────────────────────────────────────────────
function renderPipelineLabels() {
  const container = document.getElementById('pipelineLabels');
  container.innerHTML = STEPS.map(s => `<span>${s.shortName}</span>`).join('');
}

function updatePipeline() {
  const completed = STEPS.filter(s => state.stepStates[s.id] === 'completed').length;
  const pct = (completed / STEPS.length) * 100;
  document.getElementById('pipelineFill').style.width = pct + '%';
}

// ── STEP INDEX SIDEBAR ─────────────────────────────────────────
function renderStepIndex() {
  const container = document.getElementById('stepIndex');
  container.innerHTML = STEPS.map(s => {
    const ss = state.stepStates[s.id];
    const isActive = state.currentStep === s.id;
    const timerInfo = state.timers[s.id];
    let cls = ss;
    if (isActive && ss !== 'completed') cls = ss + ' active';

    let lockHtml = '';
    let metaHtml = s.durationLabel;

    if (ss === 'locked') {
      lockHtml = `<span class="lock-icon">🔒</span>`;
    } else if (ss === 'timer-running' && timerInfo) {
      lockHtml = `<span class="mini-countdown" id="mini-${s.id}">${formatTime(timerInfo.remaining)}</span>`;
      metaHtml = 'Timer running…';
    } else if (ss === 'completed') {
      lockHtml = `<span class="lock-icon text-green">✓</span>`;
      metaHtml = 'Completed';
    } else {
      lockHtml = `<span class="lock-icon" style="width:16px"></span>`;
    }

    return `
      <div class="step-index-item ${cls}" id="idx-${s.id}"
           onclick="onStepIndexClick(${s.id})">
        <div class="step-num-badge">${s.id < 10 ? '0' + s.id : s.id}</div>
        <div class="step-index-text">
          <div class="step-index-name">${s.name}</div>
          <div class="step-index-meta">${metaHtml}</div>
        </div>
        ${lockHtml}
      </div>`;
  }).join('');
}

function onStepIndexClick(id) {
  const ss = state.stepStates[id];
  if (ss === 'locked') return;
  state.currentStep = id;
  renderMainPanel();
  renderStepIndex();
  updateParamsPanel(id);
}

// ── MAIN PANEL RENDERER ────────────────────────────────────────
function renderMainPanel() {
  const panel = document.getElementById('stepDetailPanel');
  const { currentStep } = state;

  if (!state.started || currentStep === 0) {
    panel.innerHTML = document.getElementById('introCard')?.outerHTML || renderIntroCard();
    return;
  }

  const step = STEPS[currentStep - 1];
  const ss = state.stepStates[step.id];
  let html = '';

  // Always show completed steps above
  const completedBefore = STEPS.filter(s => s.id < step.id && state.stepStates[s.id] === 'completed');

  // --- Completed steps ribbon ---
  if (completedBefore.length > 0) {
    html += completedBefore.slice(-2).map(s => `
      <div class="completed-step-card">
        <div class="cs-check">✓</div>
        <div class="cs-info">
          <div class="cs-name">Step ${s.id}: ${s.name}</div>
          <div class="cs-meta">COMPLETED — ${s.durationLabel}</div>
        </div>
      </div>`).join('');
  }

  // --- Current step ---
  if (ss === 'locked') {
    html += `
      <div class="locked-indicator">
        <div class="locked-icon-big">🔐</div>
        <div class="locked-title">Step ${step.id} is Locked</div>
        <div class="locked-sub">Complete the previous step and wait for the timer to unlock this step.</div>
      </div>`;
  } else if (ss === 'timer-running') {
    html += buildTimerSection(step);
    html += buildStepCard(step, false);
  } else if (ss === 'completed') {
    html += buildStepCard(step, true);
    // Show next step preview
    const nextStep = STEPS[currentStep];
    if (nextStep) {
      const nextSS = state.stepStates[nextStep.id];
      if (nextSS === 'unlocked') {
        html += `
          <button class="unlock-btn" onclick="activateStep(${nextStep.id})">
            ▶ BEGIN STEP ${nextStep.id}: ${nextStep.name.toUpperCase()}
          </button>`;
      }
    } else {
      // All done
      html += buildProcessComplete();
    }
  } else {
    // unlocked
    html += buildStepCard(step, false);
    if (step.duration > 0) {
      html += `
        <button class="unlock-btn" onclick="startTimer(${step.id})">
          ⏱ START ${step.durationLabel.toUpperCase()} TIMER & LOCK NEXT STEP
        </button>`;
    } else {
      html += `
        <button class="complete-btn" onclick="completeStep(${step.id})">
          ✓ MARK STEP ${step.id} COMPLETE & UNLOCK NEXT
        </button>`;
    }
  }

  panel.innerHTML = html;
}

function buildStepCard(step, completed) {
  const headerExtra = step.reaction
    ? `<span class="asc-reaction">${step.reaction}</span>` : '';

  const conditionsHtml = step.conditions.map(c => `
    <div class="cond-chip">
      <span class="cond-label">${c.label}</span>
      <span class="cond-value ${c.hot ? 'hot' : ''} ${c.warn ? 'warn' : ''}">${c.value}</span>
    </div>`).join('');

  const massHtml = step.massBalance.map(m => `
    <div class="mb-row">
      <span class="mb-key">${m.key}</span>
      <span class="mb-val">${m.val}</span>
    </div>`).join('');

  const noteHtml = step.note ? `
    <div class="asc-note">
      <span class="asc-note-label">⚠ NOTE</span>
      ${step.note}
    </div>` : '';

  const completedBadge = completed
    ? `<span style="font-family:var(--font-mono);font-size:10px;color:var(--green);background:rgba(57,255,20,0.1);padding:4px 10px;border-radius:4px;border:1px solid rgba(57,255,20,0.3);">COMPLETED ✓</span>` : '';

  return `
    <div class="active-step-card">
      <div class="asc-header">
        <span class="asc-step-num">STEP ${step.id < 10 ? '0' + step.id : step.id}</span>
        <span class="asc-title">${step.name}</span>
        ${headerExtra}
        ${completedBadge}
      </div>
      <div class="asc-body">
        <p class="asc-objective">${step.objective}</p>
        <div class="asc-conditions-grid">${conditionsHtml}</div>
        <div class="mass-balance-block">
          <span class="mb-title">MASS BALANCE</span>
          ${massHtml}
        </div>
        ${noteHtml}
      </div>
    </div>`;
}

function buildTimerSection(step) {
  const timer = state.timers[step.id];
  if (!timer) return '';
  const pct = ((timer.total - timer.remaining) / timer.total) * 100;
  const offset = TIMER_RING_CIRCUMFERENCE - (pct / 100) * TIMER_RING_CIRCUMFERENCE;

  const stepIndex = STEPS.findIndex(s => s.id === step.id);
  const nextStep = stepIndex >= 0 ? STEPS[stepIndex + 1] : null;

  return `
    <div class="countdown-section" id="countdown-${step.id}">
      <span class="countdown-title">⏳ STEP ${step.id} TIMER RUNNING — NEXT STEP LOCKED</span>
      <div class="countdown-ring-wrap">
        <svg class="countdown-svg" viewBox="0 0 160 160">
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#00f5ff"/>
              <stop offset="100%" stop-color="#ff6b35"/>
            </linearGradient>
          </defs>
          <circle class="ring-bg" cx="80" cy="80" r="70"/>
          <circle class="ring-fill" cx="80" cy="80" r="70"
            stroke-dasharray="${TIMER_RING_CIRCUMFERENCE}"
            stroke-dashoffset="${offset}"
            id="ring-${step.id}"/>
        </svg>
        <div class="countdown-center">
          <span class="countdown-time" id="timer-display-${step.id}">${formatTime(timer.remaining)}</span>
          <span class="countdown-unit">REMAINING</span>
        </div>
      </div>
      <div class="countdown-step-name">${step.name}</div>
      <div class="countdown-progress-bar">
        <div class="countdown-progress-fill" id="prog-${step.id}"
             style="width:${pct}%"></div>
      </div>
      ${nextStep ? `
      <div class="next-step-preview">
        <span class="nsp-lock">🔒</span>
        <div class="nsp-text">
          <span class="nsp-label">NEXT STEP — LOCKED UNTIL TIMER COMPLETES</span>
          <span class="nsp-name">Step ${nextStep.id}: ${nextStep.name}</span>
        </div>
      </div>` : ''}
    </div>`;
}

function buildProcessComplete() {
  return `
    <div class="process-complete-banner">
      <div class="pcb-icon">⬡</div>
      <div class="pcb-title">PROCESS COMPLETE — ZnO RECOVERED</div>
      <div class="pcb-sub">
        All 10 process steps have been completed successfully.
        High-purity zinc oxide (97–99%) has been recovered from 50 g zinc ash
        via the full hydrometallurgical protocol.
      </div>
      <div class="pcb-stats">
        <div class="pcb-stat"><span class="pcb-stat-val">31–33g</span><span class="pcb-stat-lbl">ZnO Yield</span></div>
        <div class="pcb-stat"><span class="pcb-stat-val">97–99%</span><span class="pcb-stat-lbl">Purity</span></div>
        <div class="pcb-stat"><span class="pcb-stat-val">90–95%</span><span class="pcb-stat-lbl">Recovery</span></div>
      </div>
      <button class="restart-btn" onclick="restartProcess()">↺ RESTART PROTOCOL</button>
    </div>`;
}

// ── PROCESS CONTROL ────────────────────────────────────────────
function startProcess() {
  state.started = true;
  state.currentStep = 1;
  state.stepStates[1] = 'unlocked';

  setStatus('ACTIVE', 'active');
  document.getElementById('startBtn')?.remove();

  renderStepIndex();
  renderMainPanel();
  updateParamsPanel(1);
  updatePipeline();
}

function activateStep(id) {
  state.currentStep = id;
  renderStepIndex();
  renderMainPanel();
  updateParamsPanel(id);
  // Scroll to top of panel
  document.getElementById('stepDetailPanel').scrollTop = 0;
}

function startTimer(stepId) {
  const step = STEPS[stepId - 1];
  if (!step || step.duration === 0) return;

  state.stepStates[stepId] = 'timer-running';
  setStatus('RUNNING', 'running');

  state.timers[stepId] = {
    total: step.duration,
    remaining: step.duration,
    intervalId: null,
  };

  renderMainPanel();
  renderStepIndex();

  const intervalId = setInterval(() => {
    const t = state.timers[stepId];
    if (!t) { clearInterval(intervalId); return; }
    t.remaining--;

    let disp = document.getElementById(`timer-display-${stepId}`);
    let mini = document.getElementById(`mini-${stepId}`);
    let prog = document.getElementById(`prog-${stepId}`);
    let ring = document.getElementById(`ring-${stepId}`);

    if (!disp || !mini || !prog || !ring) {
      renderMainPanel();
      renderStepIndex();
      disp = document.getElementById(`timer-display-${stepId}`);
      mini = document.getElementById(`mini-${stepId}`);
      prog = document.getElementById(`prog-${stepId}`);
      ring = document.getElementById(`ring-${stepId}`);
    }

    // Update timer display in main panel
    if (disp) disp.textContent = formatTime(t.remaining);

    // Update mini countdown in sidebar
    if (mini) mini.textContent = formatTime(t.remaining);

    // Update progress bar
    const pct = ((t.total - t.remaining) / t.total) * 100;
    if (prog) prog.style.width = pct + '%';

    // Update SVG ring
    if (ring) {
      const offset = TIMER_RING_CIRCUMFERENCE - (pct / 100) * TIMER_RING_CIRCUMFERENCE;
      ring.setAttribute('stroke-dashoffset', offset);
    }

    // Timer complete
    if (t.remaining <= 0) {
      clearInterval(intervalId);
      delete state.timers[stepId];
      completeStep(stepId, true);
    }
  }, 1000);

  state.timers[stepId].intervalId = intervalId;
}

function completeStep(stepId, fromTimer = false) {
  state.stepStates[stepId] = 'completed';

  // Unlock next step
  const nextStep = STEPS[stepId];  // STEPS is 0-indexed; stepId is 1-indexed
  if (nextStep) {
    state.stepStates[nextStep.id] = 'unlocked';
  }

  // Move current view to next step if it exists
  if (nextStep) {
    state.currentStep = nextStep.id;
  }

  setStatus(nextStep ? 'ACTIVE' : 'COMPLETE', nextStep ? 'active' : '');
  updatePipeline();
  renderStepIndex();
  renderMainPanel();
  if (nextStep) updateParamsPanel(nextStep.id);

  // Scroll to top
  document.getElementById('stepDetailPanel').scrollTop = 0;
}

function restartProcess() {
  // Clear all timers
  Object.values(state.timers).forEach(t => {
    if (t.intervalId) clearInterval(t.intervalId);
  });

  state = {
    started: false,
    currentStep: 0,
    stepStates: {},
    timers: {},
  };
  STEPS.forEach(s => { state.stepStates[s.id] = 'locked'; });

  setStatus('READY', '');
  updatePipeline();
  renderStepIndex();

  // Restore intro card
  document.getElementById('stepDetailPanel').innerHTML = `
    <div class="intro-card" id="introCard">
      <div class="intro-hex-ring">
        <svg viewBox="0 0 120 138" width="120" height="138">
          <polygon points="60,4 114,34 114,104 60,134 6,104 6,34" fill="none" stroke="#00f5ff" stroke-width="1" opacity="0.3"/>
          <polygon points="60,14 104,39 104,99 60,124 16,99 16,39" fill="none" stroke="#00f5ff" stroke-width="0.5" opacity="0.5"/>
          <text x="50%" y="48%" text-anchor="middle" fill="#00f5ff" font-size="26" font-family="Space Grotesk" font-weight="700" dominant-baseline="middle">ZnO</text>
          <text x="50%" y="64%" text-anchor="middle" fill="#8892a0" font-size="8" font-family="JetBrains Mono" dominant-baseline="middle">HYDROMET</text>
        </svg>
      </div>
      <h2 class="intro-title">Hydrometallurgical Recovery System</h2>
      <p class="intro-sub">10-step sequential process protocol for recovering high-purity zinc oxide from zinc ash via leaching, purification, precipitation, and calcination.</p>
      <div class="intro-stats">
        <div class="stat-box"><span class="stat-val">10</span><span class="stat-lbl">Process Steps</span></div>
        <div class="stat-box"><span class="stat-val">~15.5h</span><span class="stat-lbl">Total Duration</span></div>
        <div class="stat-box"><span class="stat-val">31–33g</span><span class="stat-lbl">ZnO Yield</span></div>
        <div class="stat-box"><span class="stat-val">90–95%</span><span class="stat-lbl">Recovery Rate</span></div>
      </div>
      <button class="start-btn" id="startBtn" onclick="startProcess()">
        <span class="btn-icon">▶</span>
        INITIATE PROCESS
      </button>
    </div>`;

  updateParamsBody();
}

// ── PARAMS PANEL ───────────────────────────────────────────────
function updateParamsPanel(stepId) {
  const step = STEPS[stepId - 1];
  if (!step) return updateParamsBody();

  const paramsBody = document.getElementById('paramsBody');
  if (!paramsBody) return;

  const highlightHtml = step.paramsHighlight.map(p => `
    <div class="param-row">
      <span class="pk">${p.k}</span>
      <span class="pv text-cyan">${p.v}</span>
    </div>`).join('');

  paramsBody.innerHTML = `
    <div class="step-param-highlight">
      <span class="sph-title">STEP ${step.id} — CURRENT</span>
      ${highlightHtml}
    </div>
    <div class="params-divider"></div>
    <div class="param-group">
      <div class="param-title">FEED COMPOSITION</div>
      <div class="param-row"><span class="pk">Feed Ash</span><span class="pv">50 g</span></div>
      <div class="param-row"><span class="pk">ZnO Content</span><span class="pv">34.70 g (69.4%)</span></div>
      <div class="param-row"><span class="pk">Cl Salts</span><span class="pv">14.40 g (28.8%)</span></div>
      <div class="param-row"><span class="pk">Fe₂O₃</span><span class="pv">0.25 g</span></div>
      <div class="param-row"><span class="pk">PbO</span><span class="pv">0.089 g</span></div>
    </div>
    <div class="params-divider"></div>
    <div class="param-group">
      <div class="param-title">RECOVERY TARGET</div>
      <div class="param-row"><span class="pk">Conservative</span><span class="pv text-green">31.2 g (90%)</span></div>
      <div class="param-row"><span class="pk">Optimistic</span><span class="pv text-cyan">33.0 g (95%)</span></div>
      <div class="param-row"><span class="pk">Purity target</span><span class="pv text-green">97–99%</span></div>
    </div>`;
}

function updateParamsBody() {
  const paramsBody = document.getElementById('paramsBody');
  if (!paramsBody) return;
  paramsBody.innerHTML = `
    <div class="param-group">
      <div class="param-row"><span class="pk">Feed Ash</span><span class="pv">50 g</span></div>
      <div class="param-row"><span class="pk">ZnO Content</span><span class="pv">34.70 g (69.4%)</span></div>
      <div class="param-row"><span class="pk">Cl Salts</span><span class="pv">14.40 g (28.8%)</span></div>
      <div class="param-row"><span class="pk">Fe₂O₃</span><span class="pv">0.25 g</span></div>
      <div class="param-row"><span class="pk">PbO</span><span class="pv">0.089 g</span></div>
      <div class="param-row"><span class="pk">SiO₂</span><span class="pv">0.063 g</span></div>
    </div>
    <div class="params-divider"></div>
    <div class="param-group">
      <div class="param-title">REAGENTS REQUIRED</div>
      <div class="param-row"><span class="pk">Conc. H₂SO₄</span><span class="pv">25.5 mL</span></div>
      <div class="param-row"><span class="pk">DI Water</span><span class="pv">1450+ mL</span></div>
      <div class="param-row"><span class="pk">NaOH (10%)</span><span class="pv">~340 mL</span></div>
      <div class="param-row"><span class="pk">Na₂SO₄</span><span class="pv">0.5 g</span></div>
    </div>`;
}

// ── STATUS HELPERS ─────────────────────────────────────────────
function setStatus(text, cls) {
  const dot  = document.querySelector('.status-dot');
  const span = document.getElementById('globalStatus');
  dot.className  = 'status-dot' + (cls ? ' ' + cls : '');
  span.className = 'status-text' + (cls ? ' ' + cls : '');
  span.textContent = text;
}

// ── TIME FORMATTER ─────────────────────────────────────────────
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// ── MODAL (feed table) ─────────────────────────────────────────
function openFeedModal() {
  document.getElementById('modalContent').innerHTML = `
    <div style="margin-bottom:16px">
      <span style="font-family:var(--font-mono);font-size:9px;letter-spacing:3px;color:var(--cyan);">FEED COMPOSITION ANALYSIS</span>
      <h3 style="font-size:17px;font-weight:700;color:var(--white);margin-top:6px;">50 g Zinc Ash — Table 1</h3>
    </div>
    <table class="feed-table">
      <thead><tr><th>Component</th><th>Composition (%)</th><th>Mass (g)</th></tr></thead>
      <tbody>
        <tr><td>ZnO</td><td>69.40</td><td>34.70</td></tr>
        <tr><td>Cl-containing salts</td><td>28.80</td><td>14.40</td></tr>
        <tr><td>Fe₂O₃</td><td>0.500</td><td>0.250</td></tr>
        <tr><td>Al₂O₃</td><td>0.379</td><td>0.190</td></tr>
        <tr><td>SiO₂</td><td>0.125</td><td>0.063</td></tr>
        <tr><td>CaO</td><td>0.085</td><td>0.043</td></tr>
        <tr><td>PbO</td><td>0.178</td><td>0.089</td></tr>
        <tr><td>SO₃</td><td>0.060</td><td>0.030</td></tr>
        <tr><td>K₂O</td><td>0.005</td><td>0.002</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>~99.53</strong></td><td><strong>~49.77</strong></td></tr>
      </tbody>
    </table>`;
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').classList.remove('open');
  }
}

function closeModalDirect() {
  document.getElementById('modalOverlay').classList.remove('open');
}
