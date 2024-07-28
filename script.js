let score = 0;
let highScore = 0;
let timeLeft = 60;
let blueClicks = 0;
let gameInterval;
const box = document.getElementById('box');
const orangeBox = document.getElementById('orange-box');
const goldenBox = document.getElementById('golden-box');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const clickSound = document.getElementById('click-sound');
const endSound = document.getElementById('end-sound');
const gameContainer = document.getElementById('game-container');

async function fetchHighScores() {
    const response = await fetch('/high-scores');
    const scores = await response.json();
    const globalScoresList = document.getElementById('global-scores');
    globalScoresList.innerHTML = '';
    scores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.name}: ${score.score}`;
        globalScoresList.appendChild(li);
    });
}

async function submitScore(name, score) {
    await fetch('/submit-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, score }),
    });
}

function randomPosition() {
    const x = Math.floor(Math.random() * (gameContainer.clientWidth - box.clientWidth));
    const y = Math.floor(Math.random() * (gameContainer.clientHeight - box.clientHeight));
    return { x, y };
}

function moveBox(element) {
    const { x, y } = randomPosition();
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}

function updateScore(points) {
    score += points;
    scoreDisplay.textContent = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
}

function startGame() {
    score = 0;
    blueClicks = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}`;
    startButton.disabled = true;
    box.style.display = 'block';
    orangeBox.style.display = 'block';
    goldenBox.style.display = 'none';
    moveBox(box);
    moveBox(orangeBox);
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

async function endGame() {
    clearInterval(gameInterval);
    startButton.disabled = false;
    box.style.display = 'none';
    orangeBox.style.display = 'none';
    goldenBox.style.display = 'none';
    endSound.play();
    const playerName = prompt('Game Over! Enter your name:');
    if (playerName) {
        await submitScore(playerName, score);
    }
    fetchHighScores();
}

box.addEventListener('click', () => {
    blueClicks++;
    updateScore(1);
    clickSound.play();
    if (blueClicks % 10 === 0) {
        goldenBox.style.display = 'block';
        moveBox(goldenBox);
    }
    moveBox(box);
});

orangeBox.addEventListener('click', () => {
    updateScore(1.5);
    clickSound.play();
    moveBox(orangeBox);
});

goldenBox.addEventListener('click', () => {
    updateScore(10);
    clickSound.play();
    goldenBox.style.display = 'none';
});

startButton.addEventListener('click', startGame);

moveBox(box);
moveBox(orangeBox);
fetchHighScores();
