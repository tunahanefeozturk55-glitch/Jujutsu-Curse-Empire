/* =========================================================
   CURSE LEGACY
   CORE GAME SYSTEM
   ========================================================= */

"use strict";

/* =========================================================
   GAME STATE
========================================================= */

const Game = {
  version: "0.1.0",

  player: {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    name: "PLAYER",
    level: 1,
    xp: 0,
    xpNeeded: 100,

    coins: 1000,
    gems: 500,
    energy: 120,

    wins: 0,
    losses: 0,

    power: 0,

    dailyClaimed: false
  },

  heroes: [],

  inventory: {
    items: [],
    capacity: 100
  },

  formation: [null, null, null, null, null],

  stages: {
    current: 1,
    highest: 1
  },

  infinity: {
    floor: 1,
    highest: 1
  },

  clan: {
    id: null,
    name: null,
    members: [],
    level: 1,
    donation: 0,
    legacy: null
  },

  settings: {
    music: true,
    sound: true,
    autoBattle: false,
    battleSpeed: 1
  }
};


/* =========================================================
   HERO DATA
========================================================= */

const HERO_DATABASE = [

  {
    id: "void_warden",
    name: "Void Warden",
    title: "Sonsuzluk Muhafızı",
    rarity: "UR",
    element: "VOID",

    level: 1,
    stars: 1,
    awakening: 0,

    maxLevel: 100,

    hp: 4200,
    attack: 680,
    defense: 520,
    speed: 110,

    ultimateCost: 100,

    skills: [
      {
        name: "Void Break",
        damage: 1.25,
        type: "single"
      },
      {
        name: "Infinite Wall",
        damage: 0.85,
        type: "defense"
      }
    ],

    ultimate: {
      name: "Absolute Void",
      damage: 3.8,
      type: "ultimate"
    }
  },


  {
    id: "blood_reaver",
    name: "Blood Reaver",
    title: "Kızıl Cellat",
    rarity: "UR",
    element: "BLOOD",

    level: 1,
    stars: 1,
    awakening: 0,

    maxLevel: 100,

    hp: 3900,
    attack: 760,
    defense: 390,
    speed: 125,

    ultimateCost: 100,

    skills: [
      {
        name: "Crimson Fang",
        damage: 1.35,
        type: "single"
      },
      {
        name: "Blood Chain",
        damage: 1.05,
        type: "control"
      }
    ],

    ultimate: {
      name: "Crimson Execution",
      damage: 4.2,
      type: "ultimate"
    }
  },


  {
    id: "shadow_assassin",
    name: "Shadow Assassin",
    title: "Gölge Avcısı",
    rarity: "SSR",
    element: "SHADOW",

    level: 1,
    stars: 1,
    awakening: 0,

    maxLevel: 100,

    hp: 3400,
    attack: 720,
    defense: 350,
    speed: 145,

    ultimateCost: 100,

    skills: [
      {
        name: "Shadow Slash",
        damage: 1.45,
        type: "single"
      },
      {
        name: "Night Step",
        damage: 0.95,
        type: "buff"
      }
    ],

    ultimate: {
      name: "Night Execution",
      damage: 3.6,
      type: "ultimate"
    }
  },


  {
    id: "storm_sage",
    name: "Storm Sage",
    title: "Fırtına Bilgesi",
    rarity: "SSR",
    element: "LIGHTNING",

    level: 1,
    stars: 1,
    awakening: 0,

    maxLevel: 100,

    hp: 3100,
    attack: 650,
    defense: 410,
    speed: 130,

    ultimateCost: 100,

    skills: [
      {
        name: "Thunder Spear",
        damage: 1.30,
        type: "single"
      },
      {
        name: "Storm Field",
        damage: 0.90,
        type: "aoe"
      }
    ],

    ultimate: {
      name: "Heaven Thunder",
      damage: 3.5,
      type: "ultimate"
    }
  },


  {
    id: "iron_guardian",
    name: "Iron Guardian",
    title: "Çelik Muhafız",
    rarity: "SR",
    element: "EARTH",

    level: 1,
    stars: 1,
    awakening: 0,

    maxLevel: 100,

    hp: 5200,
    attack: 430,
    defense: 700,
    speed: 80,

    ultimateCost: 100,

    skills: [
      {
        name: "Iron Fist",
        damage: 0.95,
        type: "single"
      },
      {
        name: "Fortress",
        damage: 0.40,
        type: "defense"
      }
    ],

    ultimate: {
      name: "Titan Fortress",
      damage: 2.5,
      type: "ultimate"
    }
  },


  {
    id: "flame_rebel",
    name: "Flame Rebel",
    title: "Alev Asi",
    rarity: "SR",
    element: "FIRE",

    level: 1,
    stars: 1,
    awakening: 0,

    maxLevel: 100,

    hp: 3000,
    attack: 590,
    defense: 360,
    speed: 118,

    ultimateCost: 100,

    skills: [
      {
        name: "Flame Rush",
        damage: 1.15,
        type: "single"
      },
      {
        name: "Burning Rain",
        damage: 0.85,
        type: "aoe"
      }
    ],

    ultimate: {
      name: "Inferno Burst",
      damage: 3.1,
      type: "ultimate"
    }
  }

];


/* =========================================================
   ENEMY DATABASE
========================================================= */

const ENEMY_DATABASE = [

  {
    id: "cursed_beetle",
    name: "Cursed Beetle",
    title: "Lanetli Böcek",
    rarity: "BOSS",
    hp: 8000,
    attack: 450,
    defense: 250,
    speed: 70
  },

  {
    id: "shadow_wolf",
    name: "Shadow Wolf",
    title: "Gölge Kurt",
    rarity: "BOSS",
    hp: 9500,
    attack: 520,
    defense: 280,
    speed: 120
  },

  {
    id: "void_knight",
    name: "Void Knight",
    title: "Boşluk Şövalyesi",
    rarity: "BOSS",
    hp: 15000,
    attack: 700,
    defense: 500,
    speed: 95
  },

  {
    id: "abyss_beast",
    name: "Abyss Beast",
    title: "Uçurum Canavarı",
    rarity: "BOSS",
    hp: 22000,
    attack: 950,
    defense: 650,
    speed: 100
  }

];


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [
  ...document.querySelectorAll(selector)
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function deepClone(object) {
  return JSON.parse(JSON.stringify(object));
}

function formatNumber(number) {
  return Number(number || 0).toLocaleString("tr-TR");
}


/* =========================================================
   SAVE / LOAD
========================================================= */

const SAVE_KEY = "curse_legacy_save_v1";

function saveGame() {

  try {

    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify(Game)
    );

  } catch (error) {

    console.error(
      "Save error:",
      error
    );

  }
}


function loadGame() {

  try {

    const raw =
      localStorage.getItem(SAVE_KEY);

    if (!raw) {

      createStarterAccount();
      return;

    }

    const saved =
      JSON.parse(raw);

    Object.assign(
      Game,
      saved
    );

    if (!Array.isArray(Game.heroes)) {
      Game.heroes = [];
    }

    if (!Array.isArray(Game.formation)) {
      Game.formation = [
        null,
        null,
        null,
        null,
        null
      ];
    }

    if (!Game.inventory) {
      Game.inventory = {
        items: [],
        capacity: 100
      };
    }

  } catch (error) {

    console.error(
      "Load error:",
      error
    );

    createStarterAccount();

  }
}


/* =========================================================
   STARTER ACCOUNT
========================================================= */

function createStarterAccount() {

  Game.heroes = [
    createHero("shadow_assassin"),
    createHero("iron_guardian"),
    createHero("flame_rebel")
  ];

  Game.formation = [
    Game.heroes[0].id,
    Game.heroes[1].id,
    Game.heroes[2].id,
    null,
    null
  ];

  Game.inventory.items = [

    {
      id: "coin_pack",
      type: "currency",
      name: "Altın",
      quantity: 1000
    },

    {
      id: "hero_exp",
      type: "material",
      name: "Kahraman EXP",
      quantity: 500
    },

    {
      id: "awakening_core",
      type: "material",
      name: "Uyanış Çekirdeği",
      quantity: 10
    },

    {
      id: "shadow_fragment",
      type: "fragment",
      name: "Gölge Parçası",
      quantity: 20
    }

  ];

  calculatePlayerPower();

  saveGame();

}


/* =========================================================
   HERO CREATION
========================================================= */

function createHero(heroId) {

  const template =
    HERO_DATABASE.find(
      hero => hero.id === heroId
    );

  if (!template) {
    return null;
  }

  const hero =
    deepClone(template);

  hero.instanceId =
    `${hero.id}_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;

  hero.currentHp =
    hero.hp;

  hero.energy = 0;

  hero.fragments = 0;

  hero.locked = false;

  return hero;
}


/* =========================================================
   HERO POWER
========================================================= */

function getHeroPower(hero) {

  if (!hero) {
    return 0;
  }

  const base =
    hero.attack +
    hero.defense +
    Math.floor(hero.hp / 10);

  const levelBonus =
    hero.level * 40;

  const starBonus =
    hero.stars * 150;

  const awakeningBonus =
    hero.awakening * 400;

  return Math.floor(
    base +
    levelBonus +
    starBonus +
    awakeningBonus
  );
}


function calculatePlayerPower() {

  const power =
    Game.heroes.reduce(
      (total, hero) =>
        total + getHeroPower(hero),
      0
    );

  Game.player.power =
    power;

  return power;
}


/* =========================================================
   HERO LEVEL UP
========================================================= */

function levelUpHero(heroId) {

  const hero =
    Game.heroes.find(
      h => h.instanceId === heroId
    );

  if (!hero) {
    return false;
  }

  if (hero.level >= hero.maxLevel) {
    showToast(
      "Bu kahraman maksimum seviyede."
    );
    return false;
  }

  const cost =
    hero.level * 250;

  if (Game.player.coins < cost) {

    showToast(
      "Yeterli altın yok."
    );

    return false;
  }

  Game.player.coins -= cost;

  hero.level++;

  hero.attack =
    Math.floor(hero.attack * 1.055);

  hero.defense =
    Math.floor(hero.defense * 1.055);

  hero.hp =
    Math.floor(hero.hp * 1.055);

  hero.currentHp =
    hero.hp;

  calculatePlayerPower();
  saveGame();

  renderAll();

  showToast(
    `${hero.name} seviye ${hero.level} oldu!`
  );

  return true;
}


/* =========================================================
   HERO AWAKENING
========================================================= */

function awakenHero(heroId) {

  const hero =
    Game.heroes.find(
      h => h.instanceId === heroId
    );

  if (!hero) {
    return false;
  }

  const required =
    20 + hero.awakening * 20;

  if (hero.fragments < required) {

    showToast(
      `En az ${required} parça gerekiyor.`
    );

    return false;
  }

  if (hero.awakening >= 6) {

    showToast(
      "Maksimum uyanış seviyesine ulaşıldı."
    );

    return false;
  }

  hero.fragments -= required;

  hero.awakening++;

  hero.attack =
    Math.floor(hero.attack * 1.18);

  hero.defense =
    Math.floor(hero.defense * 1.18);

  hero.hp =
    Math.floor(hero.hp * 1.18);

  calculatePlayerPower();
  saveGame();

  renderAll();

  showToast(
    `${hero.name} uyandırıldı!`
  );

  return true;
}


/* =========================================================
   SCREEN SYSTEM
========================================================= */

let currentScreen =
  "home";


function showScreen(screenName) {

  const target =
    $(`#screen-${screenName}`);

  if (!target) {
    return;
  }

  $$(".screen").forEach(
    screen => {
      screen.classList.remove(
        "active"
      );
    }
  );

  target.classList.add(
    "active"
  );

  $$(".nav-item").forEach(
    item => {

      item.classList.toggle(
        "active",
        item.dataset.screen === screenName
      );

    }
  );

  currentScreen =
    screenName;

  closeSideMenu();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  renderScreen(
    screenName
  );
}


function renderScreen(screenName) {

  switch (screenName) {

    case "home":
      renderHome();
      break;

    case "heroes":
      renderHeroes();
      break;

    case "inventory":
      renderInventory();
      break;

    case "formation":
      renderFormation();
      break;

    case "stages":
      renderStages();
      break;

    case "infinity":
      renderInfinity();
      break;

    case "ranking":
      renderRanking();
      break;

    case "profile":
      renderProfile();
      break;

  }

}


/* =========================================================
   NAVIGATION
========================================================= */

function bindNavigation() {

  $$("[data-screen]").forEach(
    element => {

      element.addEventListener(
        "click",
        () => {

          const screen =
            element.dataset.screen;

          showScreen(
            screen
          );

        }
      );

    }
  );


  $$("[data-action='continue']")
    .forEach(
      button => {

        button.addEventListener(
          "click",
          startCurrentStage
        );

      }
    );


  $$("[data-action='battle-exit']")
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            Battle.end(
              false
            );

            showScreen(
              "stages"
            );

          }
        );

      }
    );


  $$("[data-action='daily']")
    .forEach(
      button => {

        button.addEventListener(
          "click",
          claimDailyReward
        );

      }
    );


  $$("[data-action='summon-one']")
    .forEach(
      button => {

        button.addEventListener(
          () => summon(1)
        );

      }
    );


  $$("[data-action='summon-ten']")
    .forEach(
      button => {

        button.addEventListener(
          () => summon(10)
        );

      }
    );


  $$("[data-action='infinity-fight']")
    .forEach(
      button => {

        button.addEventListener(
          "click",
          startInfinity
        );

      }
    );


  $$("[data-action='save-formation']")
    .forEach(
      button => {

        button.addEventListener(
          saveFormation,
        );

      }
    );

}


/* =========================================================
   SIDE MENU
========================================================= */

function openSideMenu() {

  const menu =
    $("#side-menu");

  const overlay =
    $("#menu-overlay");

  if (!menu) {
    return;
  }

  menu.classList.add(
    "open"
  );

  overlay?.classList.add(
    "visible"
  );
}


function closeSideMenu() {

  const menu =
    $("#side-menu");

  const overlay =
    $("#menu-overlay");

  menu?.classList.remove(
    "open"
  );

  overlay?.classList.remove(
    "visible"
  );
}


/* =========================================================
   HOME
========================================================= */

function renderHome() {

  $("#coins").textContent =
    formatNumber(
      Game.player.coins
    );

  $("#gems").textContent =
    formatNumber(
      Game.player.gems
    );

  $("#energy").textContent =
    formatNumber(
      Game.player.energy
    );

  $("#player-name").textContent =
    Game.player.name;

  $("#player-level").textContent =
    Game.player.level;

  $("#player-xp").textContent =
    Game.player.xp;

  $("#player-xp-needed").textContent =
    Game.player.xpNeeded;

  const xpPercent =
    Game.player.xpNeeded > 0
      ? (
          Game.player.xp /
          Game.player.xpNeeded
        ) * 100
      : 0;

  const xpBar =
    $("#player-xp-bar");

  if (xpBar) {
    xpBar.style.width =
      `${clamp(xpPercent, 0, 100)}%`;
  }

  const totalPower =
    calculatePlayerPower();

  $("#total-power").textContent =
    formatNumber(
      totalPower
    );

}


/* =========================================================
   HERO RENDER
========================================================= */

function renderHeroes() {

  const list =
    $("#hero-list");

  if (!list) {
    return;
  }

  list.innerHTML = "";

  Game.heroes.forEach(
    hero => {

      const card =
        document.createElement(
          "article"
        );

      card.className =
        `hero-card rarity-${hero.rarity.toLowerCase()}`;

      card.innerHTML = `

        <div class="hero-card-glow"></div>

        <div class="hero-art">

          <div class="hero-art-placeholder">
            ${hero.name
              .split(" ")
              .map(word => word[0])
              .join("")
              .slice(0, 3)}
          </div>

          <span class="hero-element">
            ${hero.element}
          </span>

          <span class="hero-rarity">
            ${hero.rarity}
          </span>

        </div>


        <div class="hero-card-info">

          <div class="hero-card-title">

            <div>
              <h3>${hero.name}</h3>
              <span>${hero.title}</span>
            </div>

            <strong>
              ${formatNumber(
                getHeroPower(hero)
              )}
            </strong>

          </div>


          <div class="hero-stars">

            ${renderStars(
              hero.stars
            )}

          </div>


          <div class="hero-level-row">

            <span>
              LV. ${hero.level}
            </span>

            <span>
              UYANIŞ ${hero.awakening}/6
            </span>

          </div>


          <div class="hero-mini-bar">

            <div
              style="
                width:${Math.min(
                  hero.level,
                  100
                )}%;
              ">
            </div>

          </div>


          <button
            class="hero-open-button"
            data-hero-id="${hero.instanceId}">

            DETAY

          </button>

        </div>
      `;

      list.appendChild(
        card
      );

    }
  );


  $$(".hero-open-button")
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            openHeroDetail(
              button.dataset.heroId
            );

          }
        );

      }
    );

}


function renderStars(count) {

  let html = "";

  for (
    let i = 0;
    i < 6;
    i++
  ) {

    html +=
      `<span class="${
        i < count
          ? "filled"
          : ""
      }">★</span>`;

  }

  return html;
}


/* =========================================================
   HERO DETAIL
========================================================= */

function openHeroDetail(heroId) {

  const hero =
    Game.heroes.find(
      h => h.instanceId === heroId
    );

  if (!hero) {
    return;
  }

  const container =
    $("#hero-detail-content");

  if (!container) {
    return;
  }

  container.innerHTML = `

    <div class="
      hero-detail
      rarity-${hero.rarity.toLowerCase()}
    ">

      <div class="hero-detail-art">

        <div class="hero-detail-placeholder">

          ${hero.name
            .split(" ")
            .map(word => word[0])
            .join("")}

        </div>

        <div class="hero-detail-rarity">
          ${hero.rarity}
        </div>

      </div>


      <div class="hero-detail-information">

        <span class="eyebrow">
          ${hero.element}
        </span>

        <h2>
          ${hero.name}
        </h2>

        <p>
          ${hero.title}
        </p>


        <div class="detail-stars">
          ${renderStars(hero.stars)}
        </div>


        <div class="detail-power">

          <span>GENEL GÜÇ</span>

          <strong>
            ${formatNumber(
              getHeroPower(hero)
            )}
          </strong>

        </div>


        <div class="stat-grid">

          <div>
            <span>HP</span>
            <strong>
              ${formatNumber(hero.hp)}
            </strong>
          </div>

          <di
