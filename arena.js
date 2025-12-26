document.addEventListener("DOMContentLoaded", () => {
  const crowd = document.querySelector(".crowd-heads");
  if (!crowd) return;

  const ROWS = [
    { count: 26, yMin: 6,  yMax: 18, scale: 1.0 },
    { count: 32, yMin: 18, yMax: 34, scale: 0.82 },
    { count: 22, yMin: 34, yMax: 52, scale: 0.65 }
  ];

  ROWS.forEach(row => {
    for (let i = 0; i < row.count; i++) {
      const head = document.createElement("div");
      head.className = "crowd-head";

      const depth = Math.random();
      const x = Math.random() * 100;

      head.style.left = `${x + (Math.random() * 6 - 3)}%`;
      head.style.bottom = `${row.yMin + Math.random() * (row.yMax - row.yMin)}%`;

      head.style.setProperty("--s", row.scale * (0.85 + depth * 0.25));
      head.style.setProperty("--dur", `${4 + Math.random() * 5}s`);
      head.style.style = "";

      if (row.scale < 0.75) {
        head.style.filter = "blur(1.4px)";
        head.style.opacity = "0.55";
      }

      crowd.appendChild(head);
    }
  });

  // Camera flashes (crowd only)
  function flash() {
    const f = document.createElement("div");
    f.className = "camera-flash";
    f.style.left = `${Math.random() * 100}%`;
    f.style.top = `${Math.random() * 100}%`;
    crowd.appendChild(f);
    setTimeout(() => f.remove(), 600);
  }

  (function loop() {
    setTimeout(() => {
      flash();
      loop();
    }, 900 + Math.random() * 2600);
  })();
});
