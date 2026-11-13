
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const size = 18;

let snake;
let food;
let direction;
let score;
let game;
let running = false;

function createFood() {
    return {
        x: Math.floor(Math.random() * size),
        y: Math.floor(Math.random() * size)
    };
}

function startGame() {
    clearInterval(game);

    snake = [{ x: 8, y: 8 }];
    food = createFood();
    direction = "RIGHT";
    score = 0;
    running = true;

    document.getElementById("score").textContent = score;
    document.getElementById("message").textContent = "Game Started!";

    game = setInterval(draw, 130);
}

function changeDirection(newDirection) {
    if (!running) return;

    if (newDirection === "UP" && direction !== "DOWN")
        direction = "UP";

    else if (newDirection === "DOWN" && direction !== "UP")
        direction = "DOWN";

    else if (newDirection === "LEFT" && direction !== "RIGHT")
        direction = "LEFT";

    else if (newDirection === "RIGHT" && direction !== "LEFT")
        direction = "RIGHT";
}

document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp") changeDirection("UP");
    if (e.key === "ArrowDown") changeDirection("DOWN");
    if (e.key === "ArrowLeft") changeDirection("LEFT");
    if (e.key === "ArrowRight") changeDirection("RIGHT");
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ff88" : "#00bb70";

        ctx.fillRect(
            part.x * box,
            part.y * box,
            box - 2,
            box - 2
        );
    });

    ctx.fillStyle = "red";

    ctx.fillRect(
        food.x * box,
        food.y * box,
        box - 2,
        box - 2
    );

    let head = { ...snake[0] };

    if (direction === "UP") head.y--;
    if (direction === "DOWN") head.y++;
    if (direction === "LEFT") head.x--;
    if (direction === "RIGHT") head.x++;

    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= size ||
        head.y >= size ||
        snake.some(part => part.x === head.x && part.y === head.y)
    ) {
        clearInterval(game);
        running = false;

        document.getElementById("message").textContent = "Game Over! 😢";
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;

        document.getElementById("score").textContent = score;

        food = createFood();
    } else {
        snake.pop();
    }
}
