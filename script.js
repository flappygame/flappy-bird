const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = {
  x: 50,
  y: 150,
  width: 20,
  height: 20,
  gravity: 1.5,
  lift: -20,
  velocity: 0
};

let pipes = [];
let frame = 0;
let score = 0;
let highScore = localStorage.getItem("flappyHighScore") || 0;
document.getElementById("highScore").textContent = highScore;

const jumpSound = document.getElementById("jumpSound");

function drawBird() {
  ctx.fillStyle = "red";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipe(pipe) {
  ctx.fillStyle = "green";
  ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
  ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom);
}

function update() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y > canvas.height || bird.y < 0) gameOver();

  if (frame % 90 === 0) {
    let top = Math.random() * 200 + 20;
    let gap = 120;
    pipes.push({
      x: canvas.width,
      width: 40,
      top: top,
      bottom: top + gap
    });
  }

  pipes.forEach((pipe, i) => {
    pipe.x -= 2;

    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
    ) {
      gameOver();
    }

    if (pipe.x + pipe.width < 0) {
      pipes.splice(i, 1);
      score++;
      document.getElementById("score").textContent = score;
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBird();
  pipes.forEach(drawPipe);
}

function loop() {
  update();
  draw();
  frame++;
  requestAnimationFrame(loop);
}

function gameOver() {
  alert("Game Over! Your score: " + score);
  if (score > highScore) {
    localStorage.setItem("flappyHighScore", score);
  }
  location.reload();
}

document.addEventListener("keydown", () => {
  bird.velocity = bird.lift;
  jumpSound.play();
});
document.addEventListener("click", () => {
  bird.velocity = bird.lift;
  jumpSound.play();
});

loop();
