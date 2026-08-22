const music = document.getElementById("bgMusic");

let player = {
  level: 1,
  xp: 0,
  coins: 1000,
  gems: 250,
  energy: 100,
  arenaTickets: 5,
  arenaPoints: 0,
  wins: 0,
  losses: 0,
  dailyClaimed: false
};

const characters = {
  Sukuna: { level: 1, power: 100 },
  Gojo: { level: 1, power: 95 },
  Yuta: { level: 1, power: 85 }
};


/* =========================
   SAYFA SİSTEMİ
========================= */

function openPage(pageId) {
  document.querySelectorAll(".screen").forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function home() {
  openPage("home");
}


/* =========================
   MÜZİK
========================= */

function toggleMusic() {
  const button = document.getElementById("musicBtn");

  if (!music) return;

  if (music.paused) {
    music.volume = 0.35;

    music.play()
      .then(() => {
        if (button) {
          button.innerText = "🔊 MÜZİK AÇIK";
        }
      })
      .catch(() => {
        if (button) {
          button.innerText = "🔇 MÜZİK";
        }
      });

  } else {
    music.pause();

    if (button) {
      button.innerText = "🔇 MÜZİK";
    }
  }
}


/* =========================
   XP / LEVEL
========================= */

function xpNeeded() {
  return player.level * 100;
}

function addXP(amount) {
  player.xp += amount;

  while (player.xp >= xpNeeded()) {
    player.xp -= xpNeeded();
    player.level++;
  }

  updateUI();
}

function updateUI() {
  const needed = xpNeeded();

  const level = document.getElementById("playerLevel");
  const xp = document.getElementById("playerXp");
  const neededText = document.getElementById("xpNeeded");
  const xpBar = document.getElementById("xpBar");

  if (level) level.innerText = player.level;
  if (xp) xp.innerText = player.xp;
  if (neededText) neededText.innerText = needed;

  if (xpBar) {
    xpBar.style.width =
      Math.min((player.xp / needed) * 100, 100) + "%";
  }

  const coins = document.getElementById("coins");
  const gems = document.getElementById("gems");
  const energy = document.getElementById("energy");

  if (coins) coins.innerText = player.coins;
  if (gems) gems.innerText = player.gems;
  if (energy) energy.innerText = player.energy;

  const tickets = document.getElementById("arenaTickets");
  const ticketsPage = document.getElementById("arenaTicketsPage");

  if (tickets) tickets.innerText = player.arenaTickets;
  if (ticketsPage) ticketsPage.innerText = player.arenaTickets;

  const arenaPoints = document.getElementById("arenaPoints");
  const rankingPoints = document.getElementById("rankingPoints");

  if (arenaPoints) arenaPoints.innerText = player.arenaPoints;
  if (rankingPoints) rankingPoints.innerText = player.arenaPoints;

  const profileLevel = document.getElementById("profileLevel");

  if (profileLevel) {
    profileLevel.innerText = player.level;
  }

  const wins = document.getElementById("wins");
  const losses = document.getElementById("losses");

  if (wins) wins.innerText = player.wins;
  if (losses) losses.innerText = player.losses;
}


/* =========================
   KARAKTER YÜKSELTME
========================= */

function upgrade(name) {
  const character = characters[name];

  if (!character) return;

  const cost = character.level * 100;

  if (player.coins < cost) {
    alert(
      `${name} yükseltmek için ${cost} 💰 gerekiyor!`
    );
    return;
  }

  player.coins -= cost;
  character.level++;

  character.power += 5;

  addXP(25);

  alert(
    `${name} LEVEL ${character.level} oldu! ⚡`
  );

  updateCharacterCards();
  updateUI();
}

function updateCharacterCards() {
  const cards = document.querySelectorAll(".character-card");

  cards.forEach(card => {

    const nameElement =
      card.querySelector(".character-name");

    const levelElement =
      card.querySelector(".character-level span");

    if (!nameElement || !levelElement) return;

    const name =
      nameElement.innerText.trim();

    if (characters[name]) {
      levelElement.innerText =
        characters[name].level;
    }
  });
}


/* =========================
   PAKET AÇMA
========================= */

function openPack() {

  const result =
    document.getElementById("packResult");

  if (player.gems < 100) {
    if (result) {
      result.innerText =
        "❌ Yeterli Cursed Gem yok!";
    }
    return;
  }

  player.gems -= 100;

  const rewards = [
    "Sukuna",
    "Gojo",
    "Yuta"
  ];

  const winner =
    rewards[Math.floor(Math.random() * rewards.length)];

  const rewardPower =
    characters[winner].power;

  if (result) {
    result.innerHTML =
      `✨ <b>${winner}</b> çıktı!<br>
       ⚔️ Güç: ${rewardPower}`;
  }

  addXP(50);

  updateUI();
}


/* =========================
   ARENA
========================= */

function arenaFight() {

  const result =
    document.getElementById("arenaResult");

  if (player.arenaTickets <= 0) {

    if (result) {
      result.innerText =
        "❌ Arena biletin kalmadı!";
    }

    return;
  }

  player.arenaTickets--;

  const playerPower =
    characters.Sukuna.power +
    characters.Sukuna.level * 5;

  const enemyPower =
    Math.floor(Math.random() * 120) + 50;

  if (playerPower >= enemyPower) {

    player.wins++;
    player.arenaPoints += 25;
    player.coins += 250;

    addXP(75);

    if (result) {
      result.innerHTML =
        `🏆 <b>ZAFER!</b><br>
         Rakip Gücü: ${enemyPower}<br>
         +25 Arena Puanı<br>
         +250 💰`;
    }

  } else {

    player.losses++;
    player.arenaPoints =
      Math.max(0, player.arenaPoints - 10);

    addXP(20);

    if (result) {
      result.innerHTML =
        `💀 <b>MAĞLUBİYET</b><br>
         Rakip Gücü: ${enemyPower}<br>
         -10 Arena Puanı`;
    }
  }

  updateUI();
}


/* =========================
   GÜNLÜK ÖDÜL
========================= */

function dailyReward() {

  const result =
    document.getElementById("dailyResult");

  if (player.dailyClaimed) {

    if (result) {
      result.innerText =
        "⏳ Bugünkü ödülü zaten aldın!";
    }

    return;
  }

  player.dailyClaimed = true;

  player.coins += 1000;
  player.gems += 50;

  addXP(100);

  if (result) {
    result.innerHTML =
      `🎉 Ödül alındı!<br>
       +1,000 💰<br>
       +50 💎<br>
       +100 XP`;
  }

  updateUI();
}


/* =========================
   KAYDETME
========================= */

function saveGame() {

  const saveData = {
    player,
    characters
  };

  localStorage.setItem(
    "curseEmpireSave",
    JSON.stringify(saveData)
  );
}


/* =========================
   OYUNU YÜKLE
========================= */

function loadGame() {

  const saved =
    localStorage.getItem("curseEmpireSave");

  if (!saved) {
    updateUI();
    return;
  }

  try {

    const data =
      JSON.parse(saved);

    if (data.player) {
      player = {
        ...player,
        ...data.player
      };
    }

    if (data.characters) {

      Object.keys(data.characters).forEach(name => {

        if (characters[name]) {
          characters[name] = {
            ...characters[name],
            ...data.characters[name]
          };
        }

      });

    }

  } catch (error) {

    console.log(
      "Kayıt yüklenemedi:",
      error
    );

  }

  updateUI();
  updateCharacterCards();
}


/* =========================
   OTOMATİK KAYIT
========================= */

setInterval(() => {
  saveGame();
}, 5000);


/* =========================
   BAŞLAT
========================= */

window.addEventListener("load", () => {
  loadGame();
});
