<h1 align="center">bron24-backend-internship-UZ</h1>
Backend development projects and contributions for the Bron24 sports venue booking platform during the Summer 2026 International Internship.

<h1 align="center"> 🇮🇳 **BRON24 BACKEND INTERNSHIP** 🇺🇿</h1>

---
### **Overview**

<div align="center">

<table>
  <tr>
    <th>Category</th>
    <th>Details</th>
  </tr>
  <tr>
    <td><b>Position</b></td>
    <td>Backend Developer Intern</td>
  </tr>
  <tr>
    <td><b>Timeline</b></td>
    <td>May 4, 2026 – July 3, 2026</td>
  </tr>
  <tr>
    <td><b>Organization</b></td>
    <td>Bron24</td>
  </tr>
  <tr>
    <td><b>Focus</b></td>
    <td>Technology Startup (Sports Venue Booking Platform)</td>
  </tr>
  <tr>
    <td><b>Location</b></td>
    <td>Remote / Tashkent, Uzbekistan</td>
  </tr>
</table>

</div>
---

## 🚀 Project Description
[cite_start]This repository contains the backend development work and contributions made during my internship at **Bron24**[cite: 10]. [cite_start]The focus of this role involves building and optimizing services for a specialized sports venue booking platform[cite: 26].

## 🛠 Tech Stack
* **Language:** Java
* **Framework:** Spring Boot
* **Database:** PostgreSQL / Hibernate
* **Cloud/DevOps:** AWS

## 📋 Key Responsibilities
* [cite_start]Actively contribute to ongoing backend projects and API development[cite: 18].
* [cite_start]Maintain professional engineering standards and high-quality code[cite: 18].
* [cite_start]Collaborate with the founding team and engineering leads[cite: 18, 22].

## ⚖️ Performance Standards
[cite_start]As this is a performance-based internship, my continuation depends on dedication, discipline, and the quality of contributions delivered throughout the two-month period[cite: 16].

"O'zbekistonning sport maydonchalarini bron qilish platformasini rivojlantirishga hissa qo'shish."

---
[cite_start]*Internship confirmed by Jahongir Masharipov, Founder & CEO of Bron24.* [cite: 22, 23]


<!-- TAILWIND CSS FOR THE FOOTER -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Particles Background</title>

<style>
  body {
    margin: 0;
    overflow: hidden;
    background: #0f172a;
    font-family: sans-serif;
  }

  /* Canvas covers full screen */
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  /* Optional glass content layer */
  .content {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;
    margin-top: 20%;
    font-size: 24px;
  }
</style>
</head>

<body>

<canvas id="particles"></canvas>

<div class="content">
  ✨ Floating Particles Background
</div>

<script>
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < 120; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  connectParticles();
  requestAnimationFrame(animate);
}

/* Connecting lines between nearby particles */
function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

init();
animate();

/* Responsive resize */
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
</script>

</body>
</html>
