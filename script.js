const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
let birdTop = 250;
let gravity = 3; // stronger gravity
let isGameOver = false;
let pipeInterval;
let fallInterval;

function startGame() {
  birdTop = 250;
  isGameOver = false;
  bird.style.top = birdTop + "px";
  clearGameArea();
  fallInterval = setInterval(applyGravity, 20);
  pipeInterval = setInterval(createPipe, 2000);
}

function applyGravity() {
  birdTop += gravity;
  bird.style.top = birdTop + "px";

  if (birdTop >= 560) {
    gameOver();
  }

  checkCollision();
}

function jump() {
  if (isGameOver) return;
  birdTop -= 35; // smaller jump
  if (birdTop < 0) birdTop = 0;
  bird.style.top = birdTop + "px";
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
  const pipeBottomHeight = 600 - pipeTopHeight - 150;

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
  isGameOver = true;
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

