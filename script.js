/* ============================================================
   KAIZEN: ECLIPSE PROTOCOL
   CORE PROTOTYPE
   ============================================================ */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

/* ============================================================
   CHARACTER DATABASE
   ============================================================ */

const characters = [

  {
    id: "kael",
    name: "Kael Veyron",
    rarity: "ASCEND",
    level: 60,
    maxLevel: 60,
    power: 98200,
    hp: 16800,
    attack: 2450,
    defense: 1320,
    speed: 142,
    element: "VOID",
    hair: "#10192e",
    skin: "#d9e5f4",
    cloak: "#1e3b61",
    glow: "#64eaff",
    skill: "Graviton Pierce",
    ultimate: "Eclipse Dominion",
    passive: "Void Resonance"
  },

  {
    id: "astra",
    name: "Astra Nyx",
    rarity: "ASCEND",
    level: 60,
    maxLevel: 60,
    power: 104500,
    hp: 15100,
    attack: 2720,
    defense: 1080,
    speed: 158,
    element: "ASTRAL",
    hair: "#e9d8ff",
    skin: "#f1e3e7",
    cloak: "#5b326e",
    glow: "#c28cff",
    skill: "Starfall Thread",
    ultimate: "Astral Collapse",
    passive: "Night Crown"
  },

  {
    id: "ryven",
    name: "Ryven Korr",
    rarity: "UR",
    level: 58,
    maxLevel: 60,
    power: 87200,
    hp: 17300,
    attack: 2210,
    defense: 1490,
    speed: 128,
    element: "EMBER",
    hair: "#3a1017",
    skin: "#d6b2a5",
    cloak: "#7c202c",
    glow: "#ff4d6d",
    skill: "Crimson Break",
    ultimate: "Blood Sun",
    passive: "Scarlet Pulse"
  },

  {
    id: "nira",
    name: "Nira Solen",
    rarity: "UR",
    level: 55,
    maxLevel: 60,
    power: 76400,
    hp: 18800,
    attack: 1890,
    defense: 1710,
    speed: 116,
    element: "LUMEN",
    hair: "#f2f5ff",
    skin: "#e8d7ca",
    cloak: "#d8b86a",
    glow: "#ffe48a",
    skill: "Radiant Mend",
    ultimate: "Dawn Sanctuary",
    passive: "Mercy Field"
  },

  {
    id: "zen",
    name: "Zen Arclight",
    rarity: "SSR",
    level: 52,
    maxLevel: 60,
    power: 68100,
    hp: 14200,
    attack: 2010,
    defense: 1130,
    speed: 150,
    element: "STORM",
    hair: "#142c47",
    skin: "#c8d8df",
    cloak: "#24587d",
    glow: "#65c9ff",
    skill: "Thunder Step",
    ultimate: "Skybreaker",
    passive: "Static Drive"
  },

  {
    id: "mira",
    name: "Mira Voss",
    rarity: "SSR",
    level: 50,
    maxLevel: 60,
    power: 64300,
    hp: 13600,
    attack: 2150,
    defense: 1040,
    speed: 144,
    element: "FROST",
    hair: "#b7edff",
    skin: "#e9f2ff",
    cloak: "#285b7c",
    glow: "#9cefff",
    skill: "Frost Bloom",
    ultimate: "Absolute Winter",
    passive: "Cold Focus"
  },

  {
    id: "orin",
    name: "Orin Vale",
    rarity: "SSR",
    level: 49,
    maxLevel: 60,
    power: 61900,
    hp: 15900,
    attack: 1810,
    defense: 1320,
    speed: 121,
    element: "STONE",
    hair: "#2a2928",
    skin: "#cfae93",
    cloak: "#574a3b",
    glow: "#d9a768",
    skill: "Titan Grip",
    ultimate: "World Anchor",
    passive: "Iron Root"
  },

  {
    id: "selene",
    name: "Selene Vey",
    rarity: "SSR",
    level: 47,
    maxLevel: 60,
    power: 59000,
    hp: 12800,
    attack: 1960,
    defense: 980,
    speed: 166,
    element: "MOON",
    hair: "#17162e",
    skin: "#e5d9ed",
    cloak: "#49396b",
    glow: "#b68cff",
    skill: "Moon Sever",
    ultimate: "Lunar Mirage",
    passive: "Moonstep"
  },

  {
    id: "drax",
    name: "Drax Fen",
    rarity: "SR",
    level: 44,
    maxLevel: 50,
    power: 42100,
    hp: 14700,
    attack: 1410,
    defense: 1190,
    speed: 105,
    element: "IRON",
    hair: "#252b32",
    skin: "#c8b29d",
    cloak: "#414850",
    glow: "#9caab8",
    skill: "Iron Crash",
    ultimate: "Meteor Fist",
    passive: "Hard Shell"
  },

  {
    id: "lyra",
    name: "Lyra Quen",
    rarity: "SR",
    level: 42,
    maxLevel: 50,
    power: 39700,
    hp: 11900,
    attack: 1560,
    defense: 920,
    speed: 154,
    element: "WIND",
    hair: "#dceeff",
    skin: "#e8d6c9",
    cloak: "#406a75",
    glow: "#9eeeff",
    skill: "Cyclone Arc",
    ultimate: "Heaven Spiral",
    passive: "Flow State"
  },

  {
    id: "kane",
    name: "Kane Rho",
    rarity: "SR",
    level: 41,
    maxLevel: 50,
    power: 38100,
    hp: 13000,
    attack: 1510,
    defense: 1040,
    speed: 132,
    element: "SHADOW",
    hair: "#0e101b",
    skin: "#b9a59d",
    cloak: "#29243e",
    glow: "#795bff",
    skill: "Shadow Fang",
    ultimate: "Black Corridor",
    passive: "Predator"
  },

  {
    id: "sera",
    name: "Sera Vonn",
    rarity: "SR",
    level: 40,
    maxLevel: 50,
    power: 36600,
    hp: 12600,
    attack: 1480,
    defense: 1010,
    speed: 126,
    element: "EMBER",
    hair: "#a33e42",
    skin: "#e0c1ae",
    cloak: "#5f252c",
    glow: "#ff765f",
    skill: "Ember Chain",
    ultimate: "Phoenix Circuit",
    passive: "Burning Heart"
  },

  {
    id: "vex",
    name: "Vex Orlan",
    rarity: "R",
    level: 35,
    maxLevel: 40,
    power: 22400,
    hp: 9800,
    attack: 880,
    defense: 710,
    speed: 110,
    element: "VOID",
    hair: "#34335b",
    skin: "#c7b8b1",
    cloak: "#2c2b52",
    glow: "#746cff",
    skill: "Void Needle",
    ultimate: "Dark Pulse",
    passive: "Echo"
  },

  {
    id: "ren",
    name: "Ren Aster",
    rarity: "R",
    level: 33,
    maxLevel: 40,
    power: 21100,
    hp: 10400,
    attack: 820,
    defense: 750,
    speed: 98,
    element: "STONE",
    hair: "#34291f",
    skin: "#d6bca7",
    cloak: "#514338",
    glow: "#d0a66b",
    skill: "Stone Palm",
    ultimate: "Earthfall",
    passive: "Steady Core"
  },

  {
    id: "eira",
    name: "Eira Nox",
    rarity: "R",
    level: 31,
    maxLevel: 40,
    power: 20400,
    hp: 9000,
    attack: 910,
    defense: 620,
    speed: 118,
    element: "FROST",
    hair: "#d2fbff",
    skin: "#e9edf3",
    cloak: "#345a6b",
    glow: "#8eeaff",
    skill: "Ice Needle",
    ultimate: "Frost Cage",
    passive: "Chill"
  },

  {
    id: "tor",
    name: "Tor Kain",
    rarity: "R",
    level: 30,
    maxLevel: 40,
    power: 19700,
    hp: 11300,
    attack: 790,
    defense: 860,
    speed: 90,
    element: "IRON",
    hair: "#171a20",
    skin: "#bda08e",
    cloak: "#3c404a",
    glow: "#9b9da7",
    skill: "Steel Rush",
    ultimate: "Breaker Zone",
    passive: "Guard"
  },

  {
    id: "nox",
    name: "Nox Elian",
    rarity: "R",
    level: 29,
    maxLevel: 40,
    power: 18300,
    hp: 8700,
    attack: 850,
    defense: 650,
    speed: 128,
    element: "SHADOW",
    hair: "#171020",
    skin: "#d0b4af",
    cloak: "#3b204b",
    glow: "#bc63ff",
    skill: "Dark Needle",
    ultimate: "Night Veil",
    passive: "Fade"
  },

  {
    id: "yuri",
    name: "Yuri Kael",
    rarity: "SR",
    level: 43,
    maxLevel: 50,
    power: 40800,
    hp: 12000,
    attack: 1670,
    defense: 930,
    speed: 138,
    element: "LUMEN",
    hair: "#f1e5c5",
    skin: "#ead9cc",
    cloak: "#725d34",
    glow: "#ffe29b",
    skill: "Halo Spear",
    ultimate: "Solar Gate",
    passive: "Bright Soul"
  },

  {
    id: "cass",
    name: "Cass Vire",
    rarity: "SSR",
    level: 48,
    maxLevel: 60,
    power: 60500,
    hp: 13400,
    attack: 2040,
    defense: 1000,
    speed: 148,
    element: "POISON",
    hair: "#1a3227",
    skin: "#d2c5b4",
    cloak: "#27523f",
    glow: "#69e29d",
    skill: "Venom Thread",
    ultimate: "Emerald Ruin",
    passive: "Toxic Mark"
  },

  {
    id: "vale",
    name: "Vale Drin",
    rarity: "SSR",
    level: 51,
    maxLevel: 60,
    power: 67200,
    hp: 15200,
    attack: 2180,
    defense: 1240,
    speed: 119,
    element: "GRAVITY",
    hair: "#241b37",
    skin: "#d1b5a6",
    cloak: "#4e3a72",
    glow: "#a978ff",
    skill: "Gravity Crush",
    ultimate: "Event Horizon",
    passive: "Mass Lock"
  },

  {
    id: "rhea",
    name: "Rhea Sorn",
    rarity: "UR",
    level: 57,
    maxLevel: 60,
    power: 82400,
    hp: 14500,
    attack: 2390,
    defense: 1110,
    speed: 160,
    element: "TIME",
    hair: "#d5d9f0",
    skin: "#ecd9d1",
    cloak: "#403d68",
    glow: "#a8b7ff",
    skill: "Second Sever",
    ultimate: "Zero Hour",
    passive: "Temporal Edge"
  },

  {
    id: "hajra",
    name: "Hajra Null",
    rarity: "ASCEND",
    level: 60,
    maxLevel: 60,
    power: 126000,
    hp: 21000,
    attack: 3150,
    defense: 1680,
    speed: 135,
    element: "NULL",
    hair: "#ffffff",
    skin: "#e8e8ef",
    cloak: "#16161d",
    glow: "#ffffff",
    skill: "Null Dominion",
    ultimate: "Endless Silence",
    passive: "Axiom Break"
  },

  {
    id: "oriel",
    name: "Oriel Vanta",
    rarity: "UR",
    level: 56,
    maxLevel: 60,
    power: 78800,
    hp: 16000,
    attack: 2250,
    defense: 1290,
    speed: 131,
    element: "VOID",
    hair: "#0c1224",
    skin: "#d0c5d5",
    cloak: "#263e6b",
    glow: "#627dff",
    skill: "Void Crown",
    ultimate: "Abyssal Rain",
    passive: "Black Star"
  }
];


/* ============================================================
   STATE
   ============================================================ */

const state = {
  currentScreen: "homeScreen",
  floor: 27,
  gems: 12480,
  coins: 385700,
  activeCharacter: characters[0],
  team: [
    characters[0],
    characters[1],
    characters[2],
    characters[4],
    characters[7]
  ],
  battle: null,
  auto: false,
  audioStarted: false
};


/* ============================================================
   AUDIO ENGINE
   ============================================================ */

let audioContext = null;
let masterGain = null;
let musicTimer = null;

function initAudio() {
  if (state.audioStarted) return;

  const AudioCtx = window.AudioContext || window.webkitAudioContext;

  if (!AudioCtx) return;

  audioContext = new AudioCtx();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.055;
  masterGain.connect(audioContext.destination);

  state.audioStarted = true;

  startAmbientMusic();
}

function tone(freq, duration, type = "sine", volume = .08) {
  if (!audioContext || !masterGain) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + duration
  );

  oscillator.connect(gain);
  gain.connect(masterGain);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function startAmbientMusic() {
  if (musicTimer) return;

  const notes = [110, 138.59, 164.81, 123.47];
  let i = 0;

  musicTimer = setInterval(() => {
    if (!audioContext) return;
    tone(notes[i % notes.length], 1.2, "sine", .035);
    i++;
  }, 1400);
}

function sfxAttack() {
  tone(160, .08, "sawtooth", .09);
  setTimeout(() => tone(320, .1, "triangle", .06), 40);
}

function sfxSkill() {
  tone(280, .12, "triangle", .1);
  setTimeout(() => tone(560, .18, "sine", .08), 60);
}

function sfxUltimate() {
  tone(80, .4, "sawtooth", .14);

  setTimeout(() => tone(160, .35, "triangle", .12), 100);
  setTimeout(() => tone(320, .45, "sine", .1), 200);
  setTimeout(() => tone(640, .6, "sine", .08), 300);
}

function sfxVictory() {
  tone(392, .15, "triangle", .09);
  setTimeout(() => tone(523.25, .18, "triangle", .09), 130);
  setTimeout(() => tone(659.25, .3, "triangle", .1), 260);
}


/* ============================================================
   NAVIGATION
   ============================================================ */

function showScreen(screenId) {

  $$(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(screenId);

  if (!target) return;

  target.classList.add("active");
  state.currentScreen = screenId;

  $$(".nav-btn").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.screen === screenId
    );
  });

  initAudio();
}

$$("[data-screen]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.screen);
  });
});


/* ============================================================
   TOAST
   ============================================================ */

let toastTimer;

function toast(message) {
  const element = $("#toast");

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    element.classList.remove("show");
  }, 2200);
}


/* ============================================================
   CHARACTER CARDS
   ============================================================ */

const rarityColors = {
  R: "#7f8b9d",
  SR: "#54aaff",
  SSR: "#b16cff",
  UR: "#ffd76b",
  ASCEND: "#ff5f9f"
};

function renderCharacters(filter = "ALL") {

  const grid = $("#characterGrid");

  const filtered = filter === "ALL"
    ? characters
    : characters.filter(c => c.rarity === filter);

  grid.innerHTML = filtered.map(character => {

    const color = rarityColors[character.rarity];

    return `
      <button
        class="character-card"
        style="
          --art1:${character.cloak};
          --skin:${character.skin};
          --hair:${character.hair};
          --glow:${character.glow};
          --cloak:${character.cloak};
        "
        data-character="${character.id}"
      >

        <div class="card-art">

          <div
            class="card-rarity"
            style="color:${color};border:1px solid ${color}55"
          >
            ${character.rarity}
          </div>

          <div class="card-level">
            ${character.level}/${character.maxLevel}
          </div>

        </div>

        <div class="card-info">

          <strong>${character.name}</strong>

          <span>
            ${character.element} • ${character.skill}
          </span>

          <div class="card-stats">
            <span>HP ${formatNumber(character.hp)}</span>
            <span class="card-power">
              ${formatNumber(character.power)}
            </span>
          </div>

        </div>

      </button>
    `;

  }).join("");

  $$(".character-card").forEach(card => {
    card.addEventListener("click", () => {

      const id = card.dataset.character;
      const character = characters.find(c => c.id === id);

      if (!character) return;

      state.activeCharacter = character;

      toast(
        `${character.name} • ${character.rarity} • ${character.power.toLocaleString("tr-TR")} güç`
      );

      if (!state.team.some(c => c.id === character.id)) {

        if (state.team.length < 5) {
          state.team.push(character);
          toast(`${character.name} kadroya eklendi.`);
        }

      }
    });
  });
}

$$(".rarity-tab").forEach(tab => {

  tab.addEventListener("click", () => {

    $$(".rarity-tab").forEach(t => t.classList.remove("active"));

    tab.classList.add("active");

    renderCharacters(tab.dataset.rarity);
  });

});

renderCharacters();


/* ============================================================
   KAIZEN
   ============================================================ */

function updateKaizenScreen() {

  $("#floorNumber").textContent = state.floor;

  const isBoss = state.floor % 10 === 0;

  if (isBoss) {

    $("#kaizenEnemyType").textContent = "BOSS • ABYSSAL ENTITY";

    $("#kaizenEnemyName").textContent =
      getBossName(state.floor);

    $("#kaizenDescription").textContent =
      `${state.floor}. kat. Beşli düşman kadrosunun lideri boss.`;

  } else {

    $("#kaizenEnemyType").textContent = "GÖLGE LEJYONU";

    $("#kaizenEnemyName").textContent =
      getNormalEnemyName(state.floor);

    $("#kaizenDescription").textContent =
      `Sonsuz protokolün ${state.floor}. katı.`;
  }
}

function getNormalEnemyName(floor) {

  const names = [
    "Night Warden",
    "Ash Reaver",
    "Void Stalker",
    "Crimson Hound",
    "Grave Sentinel",
    "Moon Eater",
    "Storm Fang"
  ];

  return names[floor % names.length];
}

function getBossName(floor) {

  const names = [
    "Abyss Monarch",
    "Ruin Seraph",
    "Eclipse Tyrant",
    "World Devourer",
    "Null Emperor"
  ];

  return names[(floor / 10) % names.length | 0];
}

$("#kaizenBtn").addEventListener("click", () => {
  updateKaizenScreen();
  showScreen("kaizenScreen");
});

$("#kaizenBattleBtn").addEventListener("click", () => {
  startBattle();
});


/* ============================================================
   HOME BUTTONS
   ============================================================ */

$("#continueBattleBtn").addEventListener("click", () => {
  startBattle();
});

$("#schoolBtn").addEventListener("click", () => {
  showScreen("schoolScreen");
});

$("#summonBtn").addEventListener("click", () => {
  initAudio();
  summon();
});


/* ============================================================
   SUMMON
   ============================================================ */

function summon() {

  initAudio();

  const roll = Math.random();

  let pool;

  if (roll > .93) {
    pool = characters.filter(c =>
      c.rarity === "ASCEND" || c.rarity === "UR"
    );
  } else if (roll > .70) {
    pool = characters.filter(c =>
      c.rarity === "SSR"
    );
  } else {
    pool = characters.filter(c =>
      c.rarity === "SR" || c.rarity === "R"
    );
  }

  const result = pool[
    Math.floor(Math.random() * pool.length)
  ];

  tone(440, .15, "triangle", .1);

  setTimeout(() => {
    toast(
      `NEBULA ÇAĞRISI • ${result.rarity} • ${result.name}`
    );
  }, 150);

  state.gems = Math.max(0, state.gems - 300);

  $("#gemCount").textContent =
    state.gems.toLocaleString("tr-TR");
}


/* ============================================================
   BATTLE ENGINE
   ============================================================ */

function createBattleCharacter(character, side, index) {

  const multiplier =
    side === "enemy"
      ? 1 + (state.floor * .055)
      : 1;

  return {
    ...character,

    side,
    index,

    maxHP: Math.round(character.hp * multiplier),
    hp: Math.round(character.hp * multiplier),

    attack: Math.round(character.attack * multiplier),
    defense: Math.round(character.defense * multiplier),

    energy: 0,
    alive: true,

    x: 0,
    y: 0,

    attackAnim: 0,
    hitFlash: 0,
    ultimateFlash: 0
  };
}

function createBattle() {

  const enemies = [];

  const bossFloor = state.floor % 10 === 0;

  for (let i = 0; i < 5; i++) {

    if (bossFloor && i === 0) {

      enemies.push({
        id: "boss",
        name: getBossName(state.floor),
        rarity: "ASCEND",
        level: state.floor,
        maxLevel: 999,
        power: Math.round(120000 + state.floor * 2500),
        hp: Math.round(28000 + state.floor * 1400),
        attack: Math.round(3200 + state.floor * 120),
        defense: Math.round(1900 + state.floor * 90),
        speed: 115,
        element: "BOSS",
        hair: "#ffffff",
        skin: "#d9d9e0",
        cloak: "#17141e",
        glow: "#ff3f6c",
        skill: "Abyss Strike",
        ultimate: "Cataclysm",
        passive: "Monarch Core"
      });

    } else {

      enemies.push(
        characters[
          (state.floor + i * 3) % characters.length
        ]
      );
    }
  }

  return {
    player: state.team.map(
      (c, i) => createBattleCharacter(c, "player", i)
    ),

    enemy: enemies.map(
      (c, i) => createBattleCharacter(c, "enemy", i)
    ),

    selectedEnemy: 0,
    playerIndex: 0,
    particles: [],
    floatingTexts: [],
    effects: [],
    winner: null,
    elapsed: 0
  };
}

function startBattle() {

  initAudio();

  state.battle = createBattle();

  showScreen("battleScreen");

  $("#battleFloorLabel").textContent = state.floor;

  const boss = 
