/* ---------- STARS ---------- */
const stars = document.getElementById("stars");
for (let i = 0; i < 90; i++) {
  const s = document.createElement("span");
  s.style.left = Math.random() * 100 + "vw";
  s.style.top = Math.random() * 100 + "vh";
  stars.appendChild(s);
}

/* ---------- FIREWORKS ---------- */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function firework(big = false) {
  const x = rand(0, canvas.width);
  const y = rand(0, canvas.height * 0.6);
  const count = big ? 280 : 120;
  const colors = ["#ffd700", "#ff4d6d", "#8ec5ff", "#fff"];

  for (let i = 0; i < count; i++) {
    particles.push({
      x, y,
      dx: rand(-5, 5),
      dy: rand(-5, 5),
      life: rand(70, 110),
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (--p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();

/* Firework build-up */
setInterval(() => {
  firework(false);
}, 800);

/* ---------- TYPEWRITER ---------- */
const text = [
  "This year, I just don’t promise you.",
  "I will stand on my words.",
  "",
  "I’ll always live for you, and dream with you.",
  "Can’t tell how much I admire you.",
  "I’m sorry for all the times I hurt you.",
  "I’ll try to be better — for you and for us.",
  "",
  "Here’s to another year of us 🫶",
  "Always your Kiddo 💗",
  "Wish you the Happiest new Year, my Loveee ✨"
];

const el = document.getElementById("promiseText");
let i = 0, j = 0;

function type() {
  if (i >= text.length) {
    // Big firework at end
    firework(true);

    // Show final line
    document.getElementById("finalLine").style.opacity = 1;
    return;
  }

  if (j < text[i].length) {
    el.innerHTML += text[i][j++];
    setTimeout(type, 40);
  } else {
    el.innerHTML += "<br>";
    i++;
    j = 0;
    setTimeout(type, 600);
  }
}

// Start typing
setTimeout(type, 1500);

/* ---------- BUTTON ---------- */
setTimeout(() => {
  document.querySelector(".together-btn")
    .classList.replace("hidden-btn", "show-btn");
}, 12000);

function goTogether() {
  window.location.href = "together.html";
}
