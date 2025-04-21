const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById('playBtn');
const scoreDisplay = document.getElementById('score');
const scoreBoard = document.getElementById('scoreBoard');

const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = null;
let score = 0;
let game;

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};

document.addEventListener('keydown', changeDirection);
playBtn.addEventListener('click', () => {
  if (!game) {
    direction = 'RIGHT';
    game = setInterval(draw, 150);
  }
});

function changeDirection(e) {
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
}

function draw() {
  ctx.fillStyle = '#fafafa';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#2ecc71' : '#27ae60';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(food.x, food.y, box, box);

  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === 'LEFT') head.x -= box;
  if (direction === 'UP') head.y -= box;
  if (direction === 'RIGHT') head.x += box;
  if (direction === 'DOWN') head.y += box;

  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over! Final Score: " + score);
    return;
  }

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.innerText = score;

    // Animate score
    scoreBoard.classList.add('score-animate');
    setTimeout(() => scoreBoard.classList.remove('score-animate'), 150);

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);
}
