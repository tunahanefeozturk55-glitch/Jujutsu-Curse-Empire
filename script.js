const music = document.getElementById("bgMusic");

function toggleMusic() {
  if (music.paused) {
    music.volume = 0.35;
    music.play();
    document.getElementById("musicBtn").innerText = "🔊 Müzik";
  } else {
    music.pause();
    document.getElementById("musicBtn").innerText = "🔇 Müzik";
  }
}
