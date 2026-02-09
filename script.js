// ---------- Helpers ----------
const sections = Array.from(document.querySelectorAll(".section"));

function showSection(id) {
  sections.forEach(s => s.classList.remove("active"));
  const next = document.getElementById(id);
  if (!next) return;
  next.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---------- Collage Background (360 tiles) ----------
function buildCollage() {
  const bg = document.getElementById("collage-bg");
  if (!bg) return;

  const total = 360;
  const exts = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG"];

  for (let i = 1; i <= total; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    bg.appendChild(tile);

    // Try collage-i.(jpg/jpeg/png...) until one exists
    trySetTile(tile, i, exts, 0);
  }
}

function trySetTile(tile, i, exts, idx) {
  if (idx >= exts.length) {
    // If nothing found, keep as blank tile
    tile.style.opacity = "0.25";
    return;
  }

  const url = `assets/collage/collage-${i}.${exts[idx]}`;
  const img = new Image();
  img.onload = () => {
    tile.style.backgroundImage = `url("${url}")`;
  };
  img.onerror = () => {
    trySetTile(tile, i, exts, idx + 1);
  };
  img.src = url;
}

// ---------- NO button behavior ----------
let noClickCount = 0;

function moveNoButton(btn) {
  // Move within viewport, but keep it visible
  const padding = 20;
  const maxX = window.innerWidth - btn.offsetWidth - padding;
  const maxY = window.innerHeight - btn.offsetHeight - padding;

  const x = Math.max(padding, Math.floor(Math.random() * maxX));
  const y = Math.max(padding, Math.floor(Math.random() * maxY));

  btn.style.position = "fixed";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
  btn.style.zIndex = "9999";
}

// ---------- Hover video play on hover ----------
function setupHoverVideos() {
  document.querySelectorAll(".hover-card").forEach(card => {
    const vid = card.querySelector("video.card-media");
    if (!vid) return;

    card.addEventListener("mouseenter", () => {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
      vid.pause();
      vid.currentTime = 0;
    });
  });
}

// ---------- Next buttons ----------
function setupNextButtons() {
  document.querySelectorAll("[data-next]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-next");
      showSection(target);
    });
  });
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  buildCollage();
  setupHoverVideos();
  setupNextButtons();

  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const msg = document.getElementById("noMessage");

  if (btnYes) {
    btnYes.addEventListener("click", () => {
      showSection("page-whyme");
    });
  }

  if (btnNo) {
    btnNo.addEventListener("click", () => {
      noClickCount += 1;

      if (noClickCount === 1) {
        moveNoButton(btnNo);
        msg.textContent = "";
      } else if (noClickCount === 2) {
        moveNoButton(btnNo);
        msg.textContent = "Come on… 😌";
      } else if (noClickCount === 3) {
        moveNoButton(btnNo);
        msg.textContent = "Stop playing 😤";
      } else {
        msg.textContent = "You are anyway saying YES 💖";
        // force YES after a tiny pause so they see the message
        setTimeout(() => showSection("page-whyme"), 700);
      }
    });
  }
});
