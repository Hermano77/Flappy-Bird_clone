const bird = document.getElementById("bird");
let birdTop = 250; // initial position
let gravity = 2;
let isGameOver = false;

// make the bird fall
let fall = setInterval(() => {
  if (!isGameOver) {
    birdTop += gravity;
    bird.style.top = birdTop + "px";

    if (birdTop >= 560) { // hits bottom of game container
      gameOver();
    }
  }
}, 20);

// jump on spacebar press
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    jump();
  }
});

function jump() {
  birdTop -= 50;
  if (birdTop < 0) birdTop = 0;
  bird.style.top = birdTop + "px";
}

function gameOver() {
  isGameOver = true;
  alert("Game Over!");
  clearInterval(fall);
}
