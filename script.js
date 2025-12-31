const countdownEl = document.getElementById("countdown");
const btn = document.getElementById("surpriseBtn");
const msg = document.getElementById("message");

const now = new Date();
const targetYear = now.getFullYear() + 1;
const newYearTime = new Date(`January 1, ${targetYear} 00:00:00`).getTime();


// Countdown
const timer = setInterval(() => {
  const currentTime = new Date().getTime();
  const diff = newYearTime - currentTime;

  if (diff <= 0) {
    clearInterval(timer);
    countdownEl.innerHTML = "🎉 It's 12:00!";
    btn.disabled = false;
    btn.classList.add("active");
  } else {
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    countdownEl.innerHTML = `⏳ ${h}h ${m}m ${s}s`;

  }
}, 1000);

// Button click → fireworks + message
btn.addEventListener("click", () => {
  window.location.href = "reveal.html";
});


// Fireworks animation
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ["#ffb7ff", "#c77dff", "#ffd6ff", "#e0aaff"];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x,
        y,
        dx: Math.random() * 6 - 3,
        dy: Math.random() * 6 - 3,
        life: 90,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.3, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      p.life--;
      if (p.life <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
  }

  setInterval(createFirework, 700);
  animate();
}
