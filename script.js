//geek.aakash
let btnGlow = document.querySelector(".btn");
let flame = document.querySelector(".flame");
let audio = new Audio("Diwali.mp3");


const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none"; 
canvas.style.zIndex = 0; // yeh code crackers ko background mai rakhne ke liye hai ok . Noted 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];


function createFirework(x, y) {
  const colors = ["#ff3b30", "#ff9500", "#ffcc00", "#34c759", "#0a84ff", "#5e5ce6", "#ff2d55", "#ff9f0a"];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: x,
      y: y,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 8,
      speedY: (Math.random() - 0.5) * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 100
    });
  }
}

//Unlimited crackers burst , blackhole ki tarah never ending ... , insta geek.aakash
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.speedX;
    p.y += p.speedY;
    p.size *= 0.97;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.life <= 0) particles.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

animate();


let fireworksInterval;


btnGlow.addEventListener("click", function () {
  
  flame.classList.toggle("glowing");


  if (audio.paused) audio.play();

  // Now through this button click, start fireworks..
  if (!fireworksInterval) {
    fireworksInterval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight / 2; // top half
      createFirework(x, y);
    }, 500); // Yeh crackers ko every 0.5 secs mai on screen burst karwayega
  }
});
