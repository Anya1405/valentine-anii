let currentPage = 0;
const pages = document.querySelectorAll(".section");

/* Page navigation */
function nextPage() {
  pages[currentPage].classList.remove("active");

  setTimeout(() => {
    pages[currentPage].style.display = "none";
    currentPage = (currentPage + 1) % pages.length;
    pages[currentPage].style.display = "block";

    setTimeout(() => {
      pages[currentPage].classList.add("active");
    }, 10);
  }, 800);
}

function restart() {
  pages[currentPage].classList.remove("active");

  setTimeout(() => {
    pages[currentPage].style.display = "none";
    currentPage = 0;

    pages.forEach((page) => {
      page.classList.remove("active");
      page.style.display = "none";
    });

    pages[currentPage].style.display = "block";
    setTimeout(() => pages[currentPage].classList.add("active"), 10);
  }, 800);
}

/* Music */
function stopAllAudio() {
  document.querySelectorAll("audio").forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function playMusic() {
  stopAllAudio();
  const audio = document.getElementById("background-music");
  if (!audio) return;
  audio.volume = 0.2;
  audio.play().catch(() => {});
}

function playSarthakFavouriteSong(event) {
  event.preventDefault();
  stopAllAudio();
  const audio = document.getElementById("sarthak-favourite-song");
  if (!audio) return;
  audio.volume = 0.9;
  audio.play().catch(() => {});
}

function playagartumsathho() {
  stopAllAudio();
  const audio = document.getElementById("agar-tum-sath-ho");
  if (!audio) return;
  audio.volume = 0.9;
  audio.play().catch(() => {});
}

function playTumSeHi() {
  stopAllAudio();
  const audio = document.getElementById("tum-se-hi");
  if (!audio) return;
  audio.volume = 0.9;
  audio.play().catch(() => {});
}

/* Fade background music when hover video plays */
function fadeOutBackgroundMusic(callback) {
  const bg = document.getElementById("background-music");
  if (!bg) return;

  let volume = bg.volume ?? 0.2;
  const timer = setInterval(() => {
    if (volume > 0.05) {
      volume -= 0.05;
      bg.volume = Math.max(0, volume);
    } else {
      bg.volume = 0;
      clearInterval(timer);
      if (callback) callback();
    }
  }, 100);
}

function fadeInBackgroundMusic() {
  const bg = document.getElementById("background-music");
  if (!bg) return;

  let volume = bg.volume ?? 0;
  const timer = setInterval(() => {
    if (volume < 0.2) {
      volume += 0.05;
      bg.volume = Math.min(0.2, volume);
    } else {
      bg.volume = 0.2;
      clearInterval(timer);
    }
  }, 100);
}

/* Cover opening */
function openCard() {
  document.querySelector(".cover-left").style.transform = "rotateY(-90deg)";
  document.querySelector(".cover-right").style.transform = "rotateY(90deg)";
  document.querySelector(".heart").style.opacity = "0";

  for (let i = 0; i < 30; i++) {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDelay = `${Math.random() * 3}s`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 3000);
  }

  setTimeout(() => {
    const cover = document.getElementById("cover-page");
    cover.style.opacity = "0";
    setTimeout(() => {
      cover.style.display = "none";
      document.getElementById("page1").scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, 1500);
}

/* Collage background: pick exactly 360 images from manifest */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function buildCollage() {
  const container = document.getElementById("collageBg");
  if (!container) return;

  container.innerHTML = "";

  let allPhotos = [];
  try {
    // ✅ Use RELATIVE path for Live Server safety
    const res = await fetch("assets/collage/manifest.json", { cache: "no-store" });
    allPhotos = await res.json();
  } catch (e) {
    console.warn("Missing collage manifest: assets/collage/manifest.json");
    return;
  }

  if (!Array.isArray(allPhotos) || allPhotos.length === 0) return;

  const pickCount = Math.min(allPhotos.length, 360);
  const picked = shuffle([...allPhotos]).slice(0, pickCount);

  const tileSize = 52; // bigger tiles because only 360 images
  const cols = Math.max(8, Math.floor(window.innerWidth / tileSize));

  const grid = document.createElement("div");
  grid.className = "collage-grid";
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  grid.style.gridAutoRows = `${tileSize}px`;

  const frag = document.createDocumentFragment();
  picked.forEach((src) => {
    const tile = document.createElement("div");
    tile.className = "collage-tile";
    tile.dataset.src = src;
    frag.appendChild(tile);
  });

  grid.appendChild(frag);
  container.appendChild(grid);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const src = el.dataset.src;
        if (src) {
          el.style.backgroundImage = `url("${encodeURI(src)}")`;
          el.classList.add("is-loaded");
          delete el.dataset.src;
        }
        io.unobserve(el);
      });
    },
    { root: null, rootMargin: "400px", threshold: 0.01 }
  );

  grid.querySelectorAll(".collage-tile").forEach((t) => io.observe(t));
}

let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildCollage, 700);
});

/* Hover videos */
function setupHoverVideos() {
  document.querySelectorAll(".hover-box").forEach((box) => {
    const video = box.querySelector(".hover-video");
    if (!video) return;

    video.muted = true;
    video.loop = true;

    box.addEventListener("mouseenter", () => {
      fadeOutBackgroundMusic(() => {
        video.play().catch(() => {});
      });
    });

    box.addEventListener("mouseleave", () => {
      video.pause();
      try { video.currentTime = 0; } catch {}
      fadeInBackgroundMusic();
    });
  });
}

/* Init */
document.addEventListener("DOMContentLoaded", () => {
  pages.forEach((p) => (p.style.display = "none"));
  pages[0].style.display = "block";
  setTimeout(() => pages[0].classList.add("active"), 10);

  setTimeout(buildCollage, 200);
  setupHoverVideos();

  const bg = document.getElementById("background-music");
  if (bg) bg.volume = 0.2;
});
