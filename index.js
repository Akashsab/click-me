const button = document.getElementById('game-button');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const GAME_DURATION = 10; // Game duration in seconds

let score = 0;
let gameInterval;
let timerInterval;

function startGame() {
  score = 0;
  updateScore();
  updateTimer(GAME_DURATION);

  // Set up the timer
  timerInterval = setInterval(() => {
    const currentTime = parseInt(timerDisplay.textContent.split(' ')[2]);
    if (currentTime <= 1) {
      endGame();
    } else {
      updateTimer(currentTime - 1);
    }
  }, 1000);

  // Set up the button movement
  button.addEventListener('click', incrementScore);
  gameInterval = setInterval(moveButton, 500);
}

function moveButton() {
  const maxX = window.innerWidth - button.clientWidth;
  const maxY = window.innerHeight - button.clientHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;
}

function incrementScore() {
  score++;
  updateScore();
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateTimer(seconds) {
  timerDisplay.textContent = `Time Left: ${seconds}s`;
}

function endGame() {
  clearInterval(timerInterval);
  clearInterval(gameInterval);
  button.removeEventListener('click', incrementScore);
  button.style.left = '0px';
  button.style.top = '0px';
  alert(`Game Over! Your score is ${score}`);
}

// Start the game
startGame();
