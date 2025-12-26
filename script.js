let lastScrollY = window.scrollY;
let scrollVelocity = 0;


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("starCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let stars = [];
  let w, h, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildStars();
  }

  function buildStars() {
    stars = [];
    const count = Math.floor((w * h) / 8000); // density

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.8 + 0.2,
        tw: Math.random() * 0.02 + 0.005
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (const s of stars) {
      s.a += s.tw;
      if (s.a > 1 || s.a < 0.15) s.tw *= -1;
      
  // ⭐ ambient drift (always on)
  s.y += 0.05;

  // wrap stars vertically
  if (s.y > h) s.y = 0;
  if (s.y < 0) s.y = h;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);

  resize();
  draw();
});

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  scrollVelocity = current - lastScrollY;
  lastScrollY = current;
}, { passive: true });








/**theme song button */
document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("playTheme");
  const audio = document.getElementById("themeAudio");

  if (!playBtn || !audio) return;

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸ Pause Theme";
    } else {
      audio.pause();
      playBtn.textContent = "🎵 Play Theme";
    }
  });

  // Reset button text when audio ends
  audio.addEventListener("ended", () => {
    playBtn.textContent = "🎵 Play Theme";
  });
});
