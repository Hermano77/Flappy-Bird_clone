const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
let score = 0;
let highScore = localStorage.getItem("flappyHighScore") || 0;
document.getElementById("high-score").textContent = highScore;

let birdTop = 250;
let velocity = 0;
let gravity = 0.25;       // gravity acceleration per frame
let jumpStrength = -4.6;  // upward force when jumping
let isGameOver = false;
let pipeInterval;
let fallInterval;

function startGame() {
  birdTop = 250;
  velocity = 0;
  isGameOver = false;
  bird.style.top = birdTop + "px";
  clearGameArea();
  score = 0;
document.getElementById("score").textContent = score;

  fallInterval = setInterval(applyGravity, 16);
  pipeInterval = setInterval(createPipe, 2000);
}

function applyGravity() {
  velocity += gravity;
  birdTop += gravity;
  bird.style.top = birdTop + "px";

  if (birdTop >= 560) {
    gameOver();
  }

  checkCollision();
}

function jump() {
  if (isGameOver) return;
  velocity = jumpStrength;
  console.log("Jump pressed! velocity set to:", velocity);
}

}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    if (isGameOver) {
      startGame(); // restart on spacebar
    } else {
      jump();
    }
  }
});

function createPipe() {
  const pipeTopHeight = Math.floor(Math.random() * 200) + 50;
  const pipeBottomHeight = Math.max(50, 600 - pipeTopHeight - 150);

  const pipeTop = document.createElement("div");
  pipeTop.classList.add("pipe", "pipe-top");
  pipeTop.style.height = pipeTopHeight + "px";
  pipeTop.style.left = "400px";

  const pipeBottom = document.createElement("div");
  pipeBottom.classList.add("pipe", "pipe-bottom");
  pipeBottom.style.height = pipeBottomHeight + "px";
  pipeBottom.style.left = "400px";

  gameContainer.appendChild(pipeTop);
  gameContainer.appendChild(pipeBottom);

  let pipeLeft = 400;

  const movePipe = setInterval(() => {
    if (isGameOver) {
      clearInterval(movePipe);
      return;
    }

    pipeLeft -= 2;
    if (pipeLeft === 100) {
  score++;
  document.getElementById("score").textContent = score;
}

    pipeTop.style.left = pipeLeft + "px";
    pipeBottom.style.left = pipeLeft + "px";

    if (pipeLeft < -60) {
      pipeTop.remove();
      pipeBottom.remove();
      clearInterval(movePipe);
    }
  }, 20);
}

function checkCollision() {
  const pipes = document.querySelectorAll(".pipe");
  pipes.forEach(pipe => {
    const pipeRect = pipe.getBoundingClientRect();
    const birdRect = bird.getBoundingClientRect();
    const containerRect = gameContainer.getBoundingClientRect();

    if (
      birdRect.left < pipeRect.right &&
      birdRect.right > pipeRect.left &&
      birdRect.top < pipeRect.bottom &&
      birdRect.bottom > pipeRect.top
    ) {
      gameOver();
    }
  });
}

function gameOver() {
  console.log("GAME OVER triggered");
  isGameOver = true;
  if (score > highScore) {
  highScore = score;
  localStorage.setItem("flappyHighScore", highScore);
  document.getElementById("high-score").textContent = highScore;
}

  clearInterval(fallInterval);
  clearInterval(pipeInterval);
  alert("Game Over! Press Space to restart.");
}

function clearGameArea() {
  const pipes = document.querySelectorAll(".pipe");
  pipes.forEach(pipe => pipe.remove());
}

// Start the game on first load
startGame();

