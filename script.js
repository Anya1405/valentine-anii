script.js

// ---------- LAYERS ----------
function showLayer(id){
  document.querySelectorAll(".layer").forEach(l => l.classList.remove("active"));
  const el = document.getElementById(id);
  if(!el){
    console.error("Layer not found:", id);
    return;
  }
  el.classList.add("active");

  const collage = document.getElementById("collageBg");
  const darkBg = document.getElementById("darkBg");

  if(id === "layer-ask"){
    collage.style.display = "block";
    darkBg.style.display = "block";
  } else {
    collage.style.display = "none";
    darkBg.style.display = "block";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function buildCollage(){
  const container = document.getElementById("collageBg");

  // Put your photos in assets/collage/
  // Add as many as you want in this list.
  const photos = [
    "assets/collage/1.jpg","assets/collage/2.jpg","assets/collage/3.jpg","assets/collage/4.jpg",
    "assets/collage/6.jpg","assets/collage/7.jpg","assets/collage/8.jpg","assets/collage/10.jpg",
    "assets/collage/11.jpg","assets/collage/12.jpg","assets/collage/13.jpg","assets/collage/16.jpg",
    "assets/collage/17.jpg","assets/collage/19.jpg","assets/collage/20.jpg","assets/collage/22.jpg",
    "assets/collage/23.jpg","assets/collage/24.jpg","assets/collage/25.jpg","assets/collage/26.jpg",
    "assets/collage/27.jpg","assets/collage/29.jpg","assets/collage/30.jpg","assets/collage/32.jpeg",
    "assets/collage/35.jpeg","assets/collage/38.jpeg","assets/collage/42.jpg","assets/collage/44.jpg",
    "assets/collage/48.PNG","assets/collage/49.jpg","assets/collage/50.jpg","assets/collage/51.jpg",
    "assets/collage/53.PNG","assets/collage/57.PNG","assets/collage/59.PNG","assets/collage/63.PNG",
    "assets/collage/66.jpeg","assets/collage/68.jpg","assets/collage/74.jpg","assets/collage/78.jpg",
    "assets/collage/82.jpg","assets/collage/86.jpg","assets/collage/92.jpg","assets/collage/93.jpg",
    "assets/collage/94.jpg","assets/collage/97.jpg","assets/collage/99.PNG","assets/collage/104.PNG",
    "assets/collage/107.PNG","assets/collage/108.PNG","assets/collage/109.PNG","assets/collage/110.jpg",
    "assets/collage/116.jpg","assets/collage/117.jpg","assets/collage/122.jpg","assets/collage/123.jpg",
    "assets/collage/124.jpg","assets/collage/125.jpg","assets/collage/127.jpg","assets/collage/128.jpg",
    "assets/collage/130.jpg","assets/collage/137.PNG","assets/collage/139.jpg","assets/collage/142.PNG",
    "assets/collage/144.jpg","assets/collage/145.PNG","assets/collage/146.jpg","assets/collage/150.PNG",
    "assets/collage/152.jpg","assets/collage/153.jpg","assets/collage/154.jpg","assets/collage/159.jpeg",
    "assets/collage/168.jpg","assets/collage/169.jpg","assets/collage/173.jpg","assets/collage/178.jpg",
    "assets/collage/182.jpg","assets/collage/183.jpg","assets/collage/185.jpg","assets/collage/187.jpg",
    "assets/collage/188.jpg","assets/collage/189.jpg","assets/collage/190.jpg","assets/collage/191.jpg",
    "assets/collage/194.jpg","assets/collage/199.jpg","assets/collage/201.jpg","assets/collage/203.PNG",
    "assets/collage/207.jpg","assets/collage/208.jpg","assets/collage/212.jpg","assets/collage/213.jpg",
    "assets/collage/219.jpg","assets/collage/220.jpg","assets/collage/224.jpg","assets/collage/226.jpg",
    "assets/collage/228.jpg","assets/collage/239.jpg","assets/collage/240.jpg","assets/collage/241.jpg",
    "assets/collage/246.jpg","assets/collage/247.jpg","assets/collage/249.jpg","assets/collage/251.PNG",
    "assets/collage/254.jpg","assets/collage/255.jpg", "assets/collage/258.jpg","assets/collage/262.PNG",
    "assets/collage/263.PNG","assets/collage/266.jpg","assets/collage/272.jpg","assets/collage/273.jpg",
    "assets/collage/279.jpg","assets/collage/283.jpg","assets/collage/284.jpg","assets/collage/288.jpg",
    "assets/collage/289.jpg","assets/collage/292.jpg","assets/collage/293.jpg","assets/collage/308.jpg",
    "assets/collage/310.jpg","assets/collage/312.jpg","assets/collage/313.jpg","assets/collage/319.jpg",
    "assets/collage/320.jpg","assets/collage/322.jpg","assets/collage/340.jpg","assets/collage/344.jpg",
    "assets/collage/349.jpg","assets/collage/351.jpg","assets/collage/352.jpg","assets/collage/364.jpg",
    "assets/collage/365.jpg","assets/collage/366.jpg","assets/collage/371.jpg","assets/collage/379.jpg",
    "assets/collage/380.jpg","assets/collage/383.jpg","assets/collage/384.jpg", "assets/collage/385.jpg",
    "assets/collage/397.jpg","assets/collage/398.jpg","assets/collage/399.jpg","assets/collage/400.jpg",
    "assets/collage/403.jpg","assets/collage/406.jpg","assets/collage/409.jpg","assets/collage/412.jpg",
    "assets/collage/418.jpg","assets/collage/419.jpg","assets/collage/420.PNG","assets/collage/422.jpg",
    "assets/collage/423.jpg","assets/collage/424.jpg","assets/collage/425.jpg","assets/collage/426.jpg",
    "assets/collage/428.jpg","assets/collage/430.jpeg","assets/collage/431.jpg","assets/collage/434.jpeg",
    "assets/collage/435.jpeg","assets/collage/438.jpg","assets/collage/439.jpg","assets/collage/442.jpg",
    "assets/collage/446.jpg","assets/collage/451.jpg","assets/collage/452.jpg","assets/collage/454.jpg",
    "assets/collage/455.jpg","assets/collage/457.jpg","assets/collage/458.jpg","assets/collage/459.jpg",
    "assets/collage/461.jpg","assets/collage/463.jpg","assets/collage/465.jpg","assets/collage/467.jpg",
    "assets/collage/473.jpg","assets/collage/474.jpg","assets/collage/477.jpg","assets/collage/483.jpg",
    "assets/collage/489.jpg","assets/collage/494.jpg","assets/collage/495.jpg","assets/collage/497.jpg",
    "assets/collage/498.jpg","assets/collage/499.jpg","assets/collage/528.jpg","assets/collage/534.jpg",
    "assets/collage/539.jpg","assets/collage/543.jpg","assets/collage/547.jpg","assets/collage/548.jpg",
    "assets/collage/549.jpg","assets/collage/553.jpg","assets/collage/554.jpg","assets/collage/555.jpg",
    "assets/collage/557.jpg","assets/collage/558.jpg","assets/collage/573.jpg","assets/collage/576.jpg",
    "assets/collage/592.jpg","assets/collage/597.jpg","assets/collage/608.jpeg","assets/collage/611.jpeg",
    "assets/collage/614.jpeg","assets/collage/615.jpeg","assets/collage/617.jpeg","assets/collage/625.jpeg",
    "assets/collage/626.jpeg","assets/collage/627.jpeg","assets/collage/628.jpeg","assets/collage/630.jpg",
    "assets/collage/634.jpg","assets/collage/638.jpg","assets/collage/639.jpg","assets/collage/641.jpg",
    "assets/collage/644.jpg","assets/collage/645.jpg","assets/collage/648.jpg","assets/collage/649.jpg",
    "assets/collage/668.jpg","assets/collage/679.jpg","assets/collage/688.jpg","assets/collage/689.jpg",
    "assets/collage/693.jpg","assets/collage/696.jpg","assets/collage/700.jpg","assets/collage/707.jpg",
    "assets/collage/713.jpg","assets/collage/714.jpg","assets/collage/716.jpg","assets/collage/720.jpg",
    "assets/collage/721.jpg","assets/collage/722.jpg","assets/collage/724.jpg","assets/collage/727.jpg",
    "assets/collage/729.jpg","assets/collage/745.jpg","assets/collage/748.jpg","assets/collage/750.jpg",
    "assets/collage/754.jpg","assets/collage/758.jpg","assets/collage/759.jpg","assets/collage/760.jpg",
    "assets/collage/766.jpg","assets/collage/767.jpg","assets/collage/775.jpg","assets/collage/780.jpg",
    "assets/collage/786.jpg","assets/collage/788.jpg","assets/collage/795.jpg","assets/collage/804.jpg",
    "assets/collage/808.jpg","assets/collage/811.jpg","assets/collage/812.jpg","assets/collage/814.jpg",
    "assets/collage/820.jpg","assets/collage/824.jpg","assets/collage/826.jpg","assets/collage/833.jpg",
    "assets/collage/835.jpg","assets/collage/838.jpg","assets/collage/842.jpg","assets/collage/843.jpg",
    "assets/collage/845.jpg","assets/collage/860.jpg","assets/collage/867.jpg","assets/collage/870.jpg",
    "assets/collage/873.jpg","assets/collage/877.jpg","assets/collage/878.PNG","assets/collage/879.PNG",
    "assets/collage/881.PNG","assets/collage/883.PNG","assets/collage/884.PNG","assets/collage/892.jpg",
    "assets/collage/893.jpg","assets/collage/899.jpg","assets/collage/904.jpg","assets/collage/908.jpg",
    "assets/collage/910.PNG","assets/collage/913.PNG","assets/collage/924.jpeg","assets/collage/925.jpeg",
    "assets/collage/951.jpeg","assets/collage/959.jpeg","assets/collage/963.jpeg","assets/collage/965.jpeg",
    "assets/collage/977.jpg","assets/collage/978.jpeg","assets/collage/987.jpeg","assets/collage/991.jpg",
    "assets/collage/1001.jpg","assets/collage/1002.jpg","assets/collage/1007.jpg","assets/collage/1014.jpg",
    "assets/collage/1019.jpg","assets/collage/1022.jpg","assets/collage/1024.jpg","assets/collage/1026.jpg",
    "assets/collage/1033.jpg","assets/collage/1036.jpg","assets/collage/1039.jpg","assets/collage/1042.jpg",
    "assets/collage/1044.jpg","assets/collage/1048.jpg","assets/collage/1049.jpg","assets/collage/1051.jpg",
    "assets/collage/1053.jpg","assets/collage/1054.jpg","assets/collage/1057.jpg","assets/collage/1059.PNG",
    "assets/collage/1060.PNG","assets/collage/1062.PNG","assets/collage/1066.jpeg","assets/collage/1068.jpeg",
    "assets/collage/1072.jpeg","assets/collage/1074.jpeg","assets/collage/1075.jpeg","assets/collage/1077.jpeg",
    "assets/collage/1084.jpeg","assets/collage/1087.jpeg","assets/collage/1090.jpeg","assets/collage/1093.jpeg",
    "assets/collage/1094.jpeg","assets/collage/1101.jpeg","assets/collage/1106.jpeg","assets/collage/1116.jpeg",
    "assets/collage/1118.jpeg","assets/collage/1119.jpeg","assets/collage/1120.jpeg","assets/collage/1121.jpeg",
    "assets/collage/1122.jpeg","assets/collage/1126.jpeg","assets/collage/1145.jpeg","assets/collage/1152.jpeg",
    "assets/collage/1153.jpeg","assets/collage/1154.jpeg","assets/collage/1159.jpeg","assets/collage/1160.jpeg",
    "assets/collage/1161.jpg","assets/collage/1162.jpg","assets/collage/1163.jpg","assets/collage/1164.jpg",
    "assets/collage/1165.jpg","assets/collage/1166.jpg","assets/collage/1168.jpg","assets/collage/1169.jpg",
    "assets/collage/1171.jpg","assets/collage/1173.jpg","assets/collage/1174.jpg","assets/collage/1177.jpg",
    "assets/collage/1179.jpg","assets/collage/1184.jpg","assets/collage/1185.jpg","assets/collage/1186.jpg",
    "assets/collage/1187.jpg",
  ];

  // If you don’t want to manually list 100 photos:
  // You can keep just these 12, OR duplicate paths in the array.

  container.innerHTML = "";
  container.style.display = "block";
  container.style.background = "#000";

  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(18, 1fr)";
  grid.style.gridAutoRows = "64px";
  grid.style.gap = "2px";
  grid.style.height = "100%";
  grid.style.width = "100%";

  // Fill lots of tiles
  const totalTiles = 40 * 30; // 216 tiles
  for(let i=0; i<totalTiles; i++){
    const tile = document.createElement("div");
    tile.style.overflow = "hidden";
    tile.style.background = "#111";

    const img = document.createElement("img");
    img.src = photos[i % photos.length];
    img.alt = "";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "containt";
    img.style.filter = "saturate(1.05) contrast(1.05)";
    img.loading = "lazy";
    img.style.objectFit = "contain";
    img.style.background = "#111";


    // Random “collage” feel
    const r = Math.random();
    if(r > 0.92){
      tile.style.gridColumn = "span 2";
      tile.style.gridRow = "span 2";
    } else if(r > 0.85){
      tile.style.gridColumn = "span 2";
      tile.style.gridRow = "span 1";
    } else if(r > 0.78){
      tile.style.gridColumn = "span 1";
      tile.style.gridRow = "span 2";
    }

    tile.appendChild(img);
    grid.appendChild(tile);
  }

  // Dark overlay so center card pops (like your screenshot)
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,.35)";

  container.style.position = "fixed";
  container.style.inset = "0";
  container.style.zIndex = "-3";

  container.appendChild(grid);
  container.appendChild(overlay);
}

// ---------- AUTO PICK MEDIA EXTENSIONS (jpg/jpeg/png + mp4/mov) ----------
async function pickExisting(basePathWithoutExt, exts){
  for(const ext of exts){
    const url = `${basePathWithoutExt}.${ext}`;
    try{
      const res = await fetch(url, { method: "HEAD" });
      if(res.ok) return url;
    } catch(e){}
  }
  return null;
}

async function wireMedia(){
  const imgExts = ["jpg","jpeg","png","JPG","JPEG","PNG"];
  const vidExts = ["mp4","mov","MP4","MOV"];

  // WHYME
  const whyme1 = await pickExisting("assets/whyme/card1", imgExts);
  const whyme3 = await pickExisting("assets/whyme/card3", imgExts);
  const whyme2 = await pickExisting("assets/whyme/card2", vidExts);
  const whyme4 = await pickExisting("assets/whyme/card4", vidExts);

  if(whyme1) document.getElementById("whyme-img1").src = whyme1;
  if(whyme3) document.getElementById("whyme-img3").src = whyme3;
  if(whyme2) document.getElementById("whyme-vid2").src = whyme2;
  if(whyme4) document.getElementById("whyme-vid4").src = whyme4;

  // WHYONLY
  const w1 = await pickExisting("assets/whyonly/c1", imgExts);
  const w3 = await pickExisting("assets/whyonly/c3", imgExts);
  const w5 = await pickExisting("assets/whyonly/c5", imgExts);
  const w2 = await pickExisting("assets/whyonly/c2", vidExts);
  const w4 = await pickExisting("assets/whyonly/c4", vidExts);
  const w6 = await pickExisting("assets/whyonly/c6", vidExts);

  if(w1) document.getElementById("whyonly-img1").src = w1;
  if(w3) document.getElementById("whyonly-img3").src = w3;
  if(w5) document.getElementById("whyonly-img5").src = w5;
  if(w2) document.getElementById("whyonly-vid2").src = w2;
  if(w4) document.getElementById("whyonly-vid4").src = w4;
  if(w6) document.getElementById("whyonly-vid6").src = w6;

  // STORY
  const s1 = await pickExisting("assets/story/s1", imgExts);
  const s3 = await pickExisting("assets/story/s3", imgExts);
  const s5 = await pickExisting("assets/story/s5", imgExts);
  const s7 = await pickExisting("assets/story/s7", imgExts);

  const s2 = await pickExisting("assets/story/s2", vidExts);
  const s4 = await pickExisting("assets/story/s4", vidExts);
  const s6 = await pickExisting("assets/story/s6", vidExts);
  const s8 = await pickExisting("assets/story/s8", vidExts);

  if(s1) document.getElementById("story-img1").src = s1;
  if(s3) document.getElementById("story-img3").src = s3;
  if(s5) document.getElementById("story-img5").src = s5;
  if(s7) document.getElementById("story-img7").src = s7;

  if(s2) document.getElementById("story-vid2").src = s2;
  if(s4) document.getElementById("story-vid4").src = s4;
  if(s6) document.getElementById("story-vid6").src = s6;
  if(s8) document.getElementById("story-vid8").src = s8;

  // FAV
  const fav = await pickExisting("assets/fav/fav1", imgExts);
  if(fav) document.getElementById("fav-img").src = fav;
}

// ---------- NO BUTTON ----------
let noClicks = 0;

function moveNoButton(btn){
  const padding = 14;
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const rect = btn.getBoundingClientRect();
  const maxX = vw - rect.width - padding;
  const maxY = vh - rect.height - padding;

  const x = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
  const y = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

  btn.style.position = "fixed";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
  btn.style.zIndex = "20";
}

function handleNoClick(){
  noClicks += 1;
  const btnNo = document.getElementById("btnNo");
  const hint = document.getElementById("noHint");

  moveNoButton(btnNo);

  if(noClicks === 2){
    hint.textContent = "Come on 😅";
  } else if(noClicks === 3){
    hint.textContent = "Stop playing 😤";
  } else if(noClicks >= 4){
    hint.textContent = "You are anyway saying yes ❤️";
    setTimeout(() => showLayer("layer-whyme"), 450);
  }
}

// ---------- HOVER VIDEO PLAY ----------
function setupHoverVideos(){
  document.querySelectorAll(".flip-card").forEach(card => {
    const video = card.querySelector("video");
    if(!video) return;

    card.addEventListener("mouseenter", () => video.play().catch(()=>{}));
    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

// ---------- BUTTONS ----------
function wireButtons(){
  const yes = document.getElementById("btnYes");
  const no = document.getElementById("btnNo");

  if(yes) yes.addEventListener("click", () => showLayer("layer-whyme"));
  if(no) no.addEventListener("click", handleNoClick);

  document.querySelectorAll("[data-next]").forEach(btn => {
    btn.addEventListener("click", () => showLayer(btn.getAttribute("data-next")));
  });

  const finalYes = document.getElementById("finalYes");
  const finishBtn = document.getElementById("finishBtn");
  if(finalYes) finalYes.addEventListener("click", () => showLayer("layer-final"));
  if(finishBtn) finishBtn.addEventListener("click", () => showLayer("layer-final"));
}

// ---------- START ----------
(async function init(){
  await buildCollage();
  await wireMedia();
  wireButtons();
  setupHoverVideos();
  showLayer("layer-ask");
})();

