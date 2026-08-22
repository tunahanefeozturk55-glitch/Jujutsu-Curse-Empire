const music = document.getElementById("bgMusic");

const game = {
  player: {
    level: 1,
    xp: 0,
    coins: 1000,
    gems: 250,
    energy: 100,
    tickets: 5,
    arenaPoints: 0,
    wins: 0,
    losses: 0
  },

  characters: {
    Sukuna: {
      name: "SUKUNA",
      rarity: "UR",
      form: "Legendary",
      level: 1,
      stars: 1,
      fragments: 0,
      maxFragments: 100,
      power: 100,
      hp: 1000,
      atk: 100,
      ce: 500
    },

    Gojo: {
      name: "GOJO",
      rarity: "UR",
      form: "Legendary",
      level: 1,
      stars: 1,
      fragments: 0,
      maxFragments: 100,
      power: 95,
      hp: 900,
      atk: 95,
      ce: 600
    },

    Yuta: {
      name: "YUTA",
      rarity: "UR",
      form: "Legendary",
      level: 1,
      stars: 1,
      fragments: 0,
      maxFragments: 100,
      power: 85,
      hp: 850,
      atk: 85,
      ce: 700
    }
  }
};


/* =========================
   SAYFA
========================= */

function openPage(id) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  const page = document.getElementById(id);

  if (page) {
    page.classList.add("active");
    window.scrollTo(0, 0);
  }

  if (id === "characters") {
    renderCharacters();
  }
}

function home() {
  openPage("home");
}


/* =========================
   MÜZİK
========================= */

function toggleMusic() {

  if (!music) return;

  const button = document.getElementById("musicBtn");

  if (music.paused) {

    music.volume = 0.35;

    music.play()
      .then(() => {
        if (button) {
          button.innerHTML = "🔊<span>MÜZİK AÇIK</span>";
        }
      })
      .catch(() => {
        if (button) {
          button.innerHTML = "⚠️<span>music.mp3 YOK</span>";
        }
      });

  } else {

    music.pause();

    if (button) {
      button.innerHTML = "🔇<span>MÜZİK</span>";
    }
  }
}


/* =========================
   XP
========================= */

function xpNeeded() {
  return game.player.level * 100;
}

function addXP(amount) {

  game.player.xp += amount;

  while (game.player.xp >= xpNeeded()) {

    game.player.xp -= xpNeeded();
    game.player.level++;

  }

  updateUI();
  saveGame();
}

function updateUI() {

  const p = game.player;

  const level = document.getElementById("playerLevel");
  const xp = document.getElementById("playerXp");
  const needed = document.getElementById("xpNeeded");
  const bar = document.getElementById("xpBar");

  if (level) level.innerText = p.level;
  if (xp) xp.innerText = p.xp;
  if (needed) needed.innerText = xpNeeded();

  if (bar) {
    bar.style.width =
      Math.min((p.xp / xpNeeded()) * 100, 100) + "%";
  }

  const coins = document.getElementById("coins");
  const gems = document.getElementById("gems");
  const energy = document.getElementById("energy");

  if (coins) coins.innerText = p.coins;
  if (gems) gems.innerText = p.gems;
  if (energy) energy.innerText = p.energy;

  const tickets = document.getElementById("arenaTickets");
  const ticketsPage =
    document.getElementById("arenaTicketsPage");

  if (tickets) tickets.innerText = p.tickets;
  if (ticketsPage) ticketsPage.innerText = p.tickets;

  const arenaPoints =
    document.getElementById("arenaPoints");

  if (arenaPoints) {
    arenaPoints.innerText = p.arenaPoints;
  }

  const levelProfile =
    document.getElementById("profileLevel");

  if (levelProfile) {
    levelProfile.innerText = p.level;
  }

  const wins =
    document.getElementById("wins");

  const losses =
    document.getElementById("losses");

  if (wins) wins.innerText = p.wins;
  if (losses) losses.innerText = p.losses;
}


/* =========================
   KARAKTERLER
========================= */

function renderCharacters() {

  const list =
    document.getElementById("characterList");

  if (!list) return;

  list.innerHTML = "";

  Object.values(game.characters).forEach(character => {

    const card =
      document.createElement("div");

    card.className =
      "character-card " +
      getRarityClass(character.form);

    card.innerHTML = `

      <div class="rarity">
        ${character.rarity} • ${character.form.toUpperCase()}
      </div>

      <div class="character-name">
        ${character.name}
      </div>

      <div class="character-type">
        Lanet Savaşçısı
      </div>

      <div class="character-power">
        GÜÇ ${character.power}
      </div>

      <div class="character-level">
        ⭐ LEVEL ${character.level}
      </div>

      <div class="stats">

        <div class="stat">
          ❤️ HP ${character.hp}
        </div>

        <div class="stat">
          ⚔️ ATK ${character.atk}
        </div>

        <div class="stat">
          🌀 CE ${character.ce}
        </div>

        <div class="stat">
          🧩 PARÇA
          ${character.fragments}/${character.maxFragments}
        </div>

      </div>

      <button
        class="upgrade"
        onclick="upgradeCharacter('${character.name}')">

        ⬆️ GELİŞTİR

      </button>
    `;

    list.appendChild(card);
  });
}

function getRarityClass(form) {

  if (form === "Transcendent") {
    return "transcendent";
  }

  if (form === "Prismatic") {
    return "prismatic";
  }

  if (form === "Mythic") {
    return "red";
  }

  if (form === "Epic") {
    return "purple";
  }

  return "";
}


/* =========================
   KARAKTER GELİŞTİRME
========================= */

function upgradeCharacter(name) {

  const character =
    Object.values(game.characters)
      .find(c => c.name === name);

  if (!character) return;

  const cost =
    character.level * 100;

  if (game.player.coins < cost) {

    alert(
      `Yükseltmek için ${cost} 💰 gerekiyor.`
    );

    return;
  }

  game.player.coins -= cost;

  character.level++;
  character.power += 10;
  character.hp += 80;
  character.atk += 10;
  character.ce += 25;

  addXP(25);

  alert(
    `${character.name} LEVEL ${character.level} oldu! ⚡`
  );

  renderCharacters();
  updateUI();
  saveGame();
}


/* =========================
   PARÇA SİSTEMİ
========================= */

function addFragments(name, amount) {

  const character =
    Object.values(game.characters)
      .find(c => c.name === name);

  if (!character) return;

  character.fragments += amount;

  if (character.fragments >= character.maxFragments) {

    character.fragments -= character.maxFragments;

    character.stars++;

    character.power += 25;

    alert(
      `⭐ ${character.name} yıldız seviyesi yükseldi!`
    );
  }

  renderCharacters();
  saveGame();
}


/* =========================
   ÇAĞIRMA
========================= */

function openPack() {

  const result =
    document.getElementById("packResult");

  if (game.player.gems < 100) {

    if (result) {
      result.innerHTML =
        "❌ Yeterli 💎 Cursed Gem yok.";
    }

    return;
  }

  game.player.gems -= 100;

  const names =
    ["Sukuna", "Gojo", "Yuta"];

  const winner =
    names[Math.floor(Math.random() * names.length)];

  addFragments(winner, 20);

  if (result) {

    result.innerHTML = `
      ✨ <b>UR ${winner}</b><br>
      🧩 +20 Karakter Parçası
    `;
  }

  addXP(50);
  updateUI();
  saveGame();
}


/* =========================
   ARENA
========================= */

function arenaFight() {

  if (game.player.tickets <= 0) {

    alert("❌ Arena biletin kalmadı!");

    return;
  }

  game.player.tickets--;

  const myPower =
    game.characters.Sukuna.power;

  const enemyPower =
    Math.floor(Math.random() * 150) + 50;

  const result =
    document.getElementById("arenaResult");

  if (myPower >= enemyPower) {

    game.player.wins++;
    game.player.arenaPoints += 25;
    game.player.coins += 250;

    addXP(75);

    if (result) {
      result.innerHTML = `
        🏆 <b>ZAFER!</b><br>
        Rakip Gücü: ${enemyPower}<br>
        +25 Arena Puanı<br>
        +250 💰
      `;
    }

  } else {

    game.player.losses++;

    game.player.arenaPoints =
      Math.max(
        0,
        game.player.arenaPoints - 10
      );

    addXP(20);

    if (result) {
      result.innerHTML = `
        💀 <b>MAĞLUBİYET</b><br>
        Rakip Gücü: ${enemyPower}<br>
        -10 Arena Puanı
      `;
    }
  }

  updateUI();
  saveGame();
}


/* =========================
   BASİT SAVAŞ MOTORU
========================= */

let battle = {
  playerHp: 1000,
  enemyHp: 1000
};

function startBattle() {

  battle.playerHp = 1000;
  battle.enemyHp = 1000;

  openPage("battle");

  updateBattle();

  const log =
    document.getElementById("battleLog");

  if (log) {
    log.innerHTML =
      "⚔️ Savaş başladı!";
  }
}

function updateBattle() {

  const playerHp =
    document.getElementById("playerHp");

  const enemyHp =
    document.getElementById("enemyHp");

  if (playerHp) {
    playerHp.innerText =
      Math.max(0, battle.playerHp);
  }

  if (enemyHp) {
    enemyHp.innerText =
      Math.max(0, battle.enemyHp);
  }
}

function battleAttack() {

  const damage =
    game.characters.Sukuna.atk +
    Math.floor(Math.random() * 30);

  battle.enemyHp -= damage;

  battleEnemyAttack();

  battleLog(
    `⚔️ ${damage} hasar verdin!`
  );

  checkBattle();
}

function battleSkill() {

  const damage =
    game.characters.Sukuna.atk * 2;

  battle.enemyHp -= damage;

  battleEnemyAttack();

  battleLog(
    `🔥 YETENEK! ${damage} hasar!`
  );

  checkBattle();
}

function battleUltimate() {

  const damage =
    game.characters.Sukuna.atk * 4;

  battle.enemyHp -= damage;

  battleEnemyAttack();

  battleLog(
    `💥 ULTIMATE! ${damage} hasar!`
  );

  checkBattle();
}

function battleEnemyAttack() {

  if (battle.enemyHp <= 0) return;

  const damage =
    Math.floor(Math.random() * 60) + 20;

  battle.playerHp -= damage;
}

function battleLog(text) {

  const log =
    document.getElementById("battleLog");

  if (log) {
    log.innerHTML =
      text;
  }

  updateBattle();
}

function checkBattle() {

  updateBattle();

  if (battle.enemyHp <= 0) {

    battleLog(
      "🏆 ZAFER! Düşmanı yendin!"
    );

    game.player.coins += 300;

    addXP(100);

    saveGame();

    return;
  }

  if (battle.playerHp <= 0) {

    battleLog(
      "💀 MAĞLUBİYET!"
    );

    saveGame();
  }
}


/* =========================
   KAYDET / YÜKLE
========================= */

function saveGame() {

  localStorage.setItem(
    "curseEmpireSave",
    JSON.stringify(game)
  );
}

function loadGame() {

  const saved =
    localStorage.getItem(
      "curseEmpireSave"
    );

  if (!saved) {

    updateUI();
    renderCharacters();

    return;
  }

  try {

    const data =
      JSON.parse(saved);

    if (data.player) {
      game.player = {
        ...game.player,
        ...data.player
      };
    }

    if (data.characters) {

      Object.keys(data.characters)
        .forEach(name => {

          if (game.characters[name]) {

            game.characters[name] = {
              ...game.characters[name],
              ...data.characters[name]
            };
          }
        });
    }

  } catch (error) {

    console.error(
      "Kayıt yüklenemedi:",
      error
    );
  }

  updateUI();
  renderCharacters();
}


/* =========================
   BAŞLANGIÇ
========================= */

window.addEventListener(
  "load",
  () => {

    loadGame();

    setInterval(
      saveGame,
      5000
    );

  }
);
