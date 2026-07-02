/* ============================================================
   MEGA JEOPARDY — game logic
   All game content lives in config.js; you shouldn't need to
   edit this file to change questions or categories.
   ============================================================ */

const STORAGE_KEY = "mega-jeopardy-state-v1";

const state = {
  teams: [],            // [{ id, name, score }]
  usedClues: {},        // { "catIndex-rowIndex": true }
  nextTeamId: 1,
};

let activeClue = null;  // { catIndex, rowIndex, points }
let debugMode = false;  // host preview: show every question + answer on the board

/* ---------- persistence ---------- */

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved && Array.isArray(saved.teams)) {
      state.teams = saved.teams;
      state.usedClues = saved.usedClues || {};
      state.nextTeamId = saved.nextTeamId || state.teams.length + 1;
    }
  } catch {
    /* corrupted state — start fresh */
  }
}

/* ---------- board ---------- */

function renderBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${GAME_CONFIG.categories.length}, 1fr)`;
  board.classList.toggle("debug", debugMode);

  GAME_CONFIG.categories.forEach((cat) => {
    const cell = document.createElement("div");
    cell.className = "category-cell";
    cell.textContent = cat.name;
    board.appendChild(cell);
  });

  POINT_VALUES.forEach((points, rowIndex) => {
    GAME_CONFIG.categories.forEach((cat, catIndex) => {
      const clue = cat.clues[rowIndex];
      const cell = document.createElement("button");
      cell.className = "clue-cell";
      const key = `${catIndex}-${rowIndex}`;
      const used = state.usedClues[key];

      if (debugMode) {
        // Host preview: show the question + answer text on every tile.
        cell.classList.add("debug-cell");
        if (used) cell.classList.add("done");

        const pts = document.createElement("span");
        pts.className = "debug-points";
        const ptsFlags = `${clue && clue.image ? " 🖼" : ""}${clue && clue.virtualVantage ? " ★VV" : ""}`;
        pts.textContent = `${points}${ptsFlags}`;
        if (clue && clue.virtualVantage) pts.classList.add("debug-vv");

        const q = document.createElement("span");
        q.className = "debug-q";
        q.textContent = clue ? clue.question : "—";

        const a = document.createElement("span");
        a.className = "debug-a";
        a.textContent = clue ? clue.answer : "";

        cell.append(pts, q, a);
        if (clue) cell.addEventListener("click", () => openClue(catIndex, rowIndex, points));
      } else if (used) {
        cell.classList.add("done");
        cell.textContent = "✦";
        cell.disabled = true;
      } else {
        cell.textContent = points;
        if (clue && clue.image) {
          const badge = document.createElement("span");
          badge.className = "pic-badge";
          badge.textContent = "🖼";
          badge.title = "Picture clue";
          cell.appendChild(badge);
        }
        cell.addEventListener("click", () => openClue(catIndex, rowIndex, points));
      }
      board.appendChild(cell);
    });
  });
}

function toggleDebug() {
  debugMode = !debugMode;
  const btn = document.getElementById("debug-btn");
  btn.classList.toggle("active", debugMode);
  btn.textContent = debugMode ? "🐛 DEBUG: HIDE CLUES" : "🐛 DEBUG: SHOW ALL CLUES";
  renderBoard();
}

/* ---------- clue modal ---------- */

function openClue(catIndex, rowIndex, points) {
  const cat = GAME_CONFIG.categories[catIndex];
  const clue = cat.clues[rowIndex];
  if (!clue) return;

  const isVirtualVantage = !!clue.virtualVantage;
  activeClue = { catIndex, rowIndex, points, virtualVantage: isVirtualVantage };

  document.getElementById("modal-category").textContent = cat.name;
  document.getElementById("modal-points").textContent = `${points} PTS`;
  document.getElementById("modal-question").textContent = clue.question;

  const img = document.getElementById("modal-image");
  if (clue.image) {
    img.src = clue.image;
    img.classList.remove("hidden");
    img.onerror = () => {
      img.classList.add("hidden");
      console.warn(`Image not found for clue: ${clue.image}`);
    };
  } else {
    img.classList.add("hidden");
    img.removeAttribute("src");
  }

  document.getElementById("modal-answer").classList.add("hidden");
  document.getElementById("modal-answer-text").textContent = clue.answer;

  const ansImg = document.getElementById("modal-answer-image");
  if (clue.answerImage) {
    ansImg.src = clue.answerImage;
    ansImg.classList.remove("hidden");
    ansImg.onerror = () => {
      ansImg.classList.add("hidden");
      console.warn(`Answer image not found for clue: ${clue.answerImage}`);
    };
  } else {
    ansImg.classList.add("hidden");
    ansImg.removeAttribute("src");
  }

  document.getElementById("reveal-btn").classList.remove("hidden");
  document.getElementById("award-panel").classList.add("hidden");

  // Virtual Vantage dressing: gold banner + themed modal card.
  const modalCard = document.querySelector("#modal .modal-card");
  modalCard.classList.toggle("virtual-vantage", isVirtualVantage);
  document.getElementById("modal-vv-banner").classList.toggle("hidden", !isVirtualVantage);

  const modal = document.getElementById("modal");
  if (isVirtualVantage) {
    // Play the splash first, then reveal the clue underneath it.
    playVirtualVantageSplash(() => modal.classList.remove("hidden"));
  } else {
    modal.classList.remove("hidden");
  }
}

/* ---------- virtual vantage splash ---------- */

function playVirtualVantageSplash(onDone) {
  const splash = document.getElementById("vv-splash");
  splash.classList.remove("hidden");
  // restart the CSS animation if it played before
  splash.classList.remove("animate");
  void splash.offsetWidth; // force reflow
  splash.classList.add("animate");

  burstConfetti();

  // Reveal the clue partway through so it's ready as the splash fades.
  setTimeout(() => onDone && onDone(), 1500);
  setTimeout(() => {
    splash.classList.add("hidden");
    splash.classList.remove("animate");
  }, 2200);
}

function revealAnswer() {
  document.getElementById("modal-answer").classList.remove("hidden");
  document.getElementById("reveal-btn").classList.add("hidden");
  renderAwardPanel();
  document.getElementById("award-panel").classList.remove("hidden");
}

function renderAwardPanel() {
  const wrap = document.getElementById("award-teams");
  wrap.innerHTML = "";
  if (state.teams.length === 0) {
    const note = document.createElement("p");
    note.className = "award-hint";
    note.textContent = "(No teams yet — add some on the scoreboard!)";
    wrap.appendChild(note);
    return;
  }
  state.teams.forEach((team) => {
    const chip = document.createElement("div");
    chip.className = "award-team";

    const name = document.createElement("span");
    name.className = "award-team-name";
    name.textContent = team.name;

    const plus = document.createElement("button");
    plus.className = "award-btn plus";
    plus.textContent = `+${activeClue.points}`;
    plus.addEventListener("click", () => awardPoints(team.id, activeClue.points, true));

    const minus = document.createElement("button");
    minus.className = "award-btn minus";
    minus.textContent = `−${activeClue.points}`;
    minus.addEventListener("click", () => awardPoints(team.id, -activeClue.points, false));

    chip.append(name, plus, minus);
    wrap.appendChild(chip);
  });
}

function awardPoints(teamId, delta, celebrate) {
  const team = state.teams.find((t) => t.id === teamId);
  if (team) team.score += delta;
  if (celebrate) burstConfetti();
  closeClue(true);
}

function closeClue(markUsed) {
  if (activeClue && markUsed) {
    state.usedClues[`${activeClue.catIndex}-${activeClue.rowIndex}`] = true;
  }
  activeClue = null;
  document.getElementById("modal").classList.add("hidden");
  saveState();
  renderBoard();
  renderTeams();
}

/* ---------- teams / scoreboard ---------- */

function renderTeams() {
  const wrap = document.getElementById("teams");
  wrap.innerHTML = "";

  const topScore = Math.max(...state.teams.map((t) => t.score), -Infinity);

  state.teams.forEach((team) => {
    const card = document.createElement("div");
    card.className = "team-card";
    if (state.teams.length > 1 && team.score === topScore && topScore > 0) {
      card.classList.add("leader");
    }

    const del = document.createElement("button");
    del.className = "team-delete";
    del.textContent = "✕";
    del.title = "Remove team";
    del.addEventListener("click", () => {
      if (confirm(`Remove team "${team.name}"?`)) {
        state.teams = state.teams.filter((t) => t.id !== team.id);
        saveState();
        renderTeams();
      }
    });

    const name = document.createElement("div");
    name.className = "team-name";
    name.textContent = team.name;
    name.title = "Click to rename";
    name.addEventListener("click", () => {
      const newName = prompt("Team name:", team.name);
      if (newName && newName.trim()) {
        team.name = newName.trim();
        saveState();
        renderTeams();
      }
    });

    const score = document.createElement("div");
    score.className = "team-score";
    score.textContent = team.score;
    if (team.score < 0) score.classList.add("negative");

    const controls = document.createElement("div");
    controls.className = "team-controls";
    [-100, +100].forEach((delta) => {
      const btn = document.createElement("button");
      btn.className = "score-btn";
      btn.textContent = delta > 0 ? `+${delta}` : `${delta}`;
      btn.title = "Manual score adjustment";
      btn.addEventListener("click", () => {
        team.score += delta;
        saveState();
        renderTeams();
      });
      controls.appendChild(btn);
    });

    card.append(del, name, score, controls);
    wrap.appendChild(card);
  });
}

function addTeam() {
  const name = prompt("Team name:", `Team ${state.nextTeamId}`);
  if (name === null) return;
  state.teams.push({
    id: state.nextTeamId++,
    name: name.trim() || `Team ${state.nextTeamId - 1}`,
    score: 0,
  });
  saveState();
  renderTeams();
}

function resetGame() {
  if (!confirm("Reset the board AND all scores?")) return;
  state.usedClues = {};
  state.teams.forEach((t) => (t.score = 0));
  saveState();
  renderBoard();
  renderTeams();
}

/* ---------- confetti ---------- */

function burstConfetti() {
  const colors = ["#ff2e93", "#ffce00", "#00f0ff", "#a8ff3e", "#8b2eff", "#ff9500"];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${1.6 + Math.random() * 1.8}s`;
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4200);
  }
}

/* ---------- init ---------- */

function init() {
  document.getElementById("game-title").textContent = GAME_CONFIG.title || "MEGA JEOPARDY";
  document.title = GAME_CONFIG.title || "MEGA JEOPARDY";

  loadState();
  renderBoard();
  renderTeams();

  document.getElementById("add-team-btn").addEventListener("click", addTeam);
  document.getElementById("reset-btn").addEventListener("click", resetGame);
  document.getElementById("debug-btn").addEventListener("click", toggleDebug);
  document.getElementById("reveal-btn").addEventListener("click", revealAnswer);
  document.getElementById("no-award-btn").addEventListener("click", () => closeClue(true));
  document.getElementById("modal-close").addEventListener("click", () => closeClue(false));
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") closeClue(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !document.getElementById("modal").classList.contains("hidden")) {
      closeClue(false);
    }
  });
}

init();
