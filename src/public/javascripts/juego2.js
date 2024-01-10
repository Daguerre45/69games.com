const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = 800;
canvas.height = 820;

document.body.style.display = 'flex';
document.body.style.alignItems = 'center';
document.body.style.justifyContent = 'center';
document.body.style.height = '100vh';
document.body.style.margin = '0';

// Screen dimensions
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 820;

// Colors
const WHITE = "#ffffff";
const RED = "#ff0000";

// Player attributes
const playerWidth = 50;
const playerHeight = 50;
let playerX = SCREEN_WIDTH / 2 - playerWidth / 2;
let playerY = SCREEN_HEIGHT - playerHeight - 70;
let playerSpeed = 15;
let playerLives = 5;
let playerHitpoints = 7;

// Enemy attributes
const enemyWidth = 50;
const enemyHeight = 50;
let enemySpeed = 1.6;
let enemies = [];
let enemiesHit = 0;

// Laser attributes
const laserWidth = 5;
const laserHeight = 20;
const laserSpeed = 5;
let lasers = [];

// Game state
let level = 0; 

// Load images
const background = new Image();
background.src = "/images/outerspace.png";
const playerImage = new Image();
playerImage.src = "/juego2/playerImage"; 
const enemyImage = new Image();
enemyImage.src = "/images/red.png"; 
const laserImage = new Image();
laserImage.src = "/images/laser.png"; 

// Function to display player lives and hitpoints
function displayStats() {
    ctx.fillStyle = WHITE;
    ctx.font = "20px Arial";
    ctx.fillText("Lives: " + playerLives, 10, 30);
    ctx.fillText("Hitpoints: " + playerHitpoints, 10, 60);
    ctx.fillText("Enemies Hit: " + enemiesHit, 10, 90);
    ctx.fillText("Level: " + level, SCREEN_WIDTH - 150, 30);
}

// Function to display "You Lost" message
function displayGameOver() {
    ctx.fillStyle = RED;
    ctx.font = "40px Arial";
    ctx.fillText("You Lost!", SCREEN_WIDTH / 2 - 100, SCREEN_HEIGHT / 2 - 50);
}

let key = null;

window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && playerX > 0) {
        key = "left";
    } else if (e.key === "ArrowRight" && playerX < SCREEN_WIDTH - playerWidth) {
        key = "right";
    } else if (e.key === " ") {
        lasers.push({ x: playerX + playerWidth / 2 - laserWidth / 2, y: playerY });
    }
});

window.addEventListener("keyup", function (e) {
    key = null;
});

// Main game loop
function gameLoop() {
    // Move player
    if (key === "left") {
        playerX -= playerSpeed;
    }

    if (key === "right") {
        playerX += playerSpeed;
    }

    // Move enemies
    enemies.forEach((enemy) => {
        enemy.y += enemySpeed;
        if (enemy.y > SCREEN_HEIGHT) {
            playerLives--;
            enemies.splice(enemies.indexOf(enemy), 1);
        }
    });

    // Check collisions
    enemies.forEach((enemy) => {
        if (
            playerX < enemy.x + enemyWidth &&
            playerX + playerWidth > enemy.x &&
            playerY < enemy.y + enemyHeight &&
            playerY + playerHeight > enemy.y
        ) {
            playerHitpoints--;
            enemies.splice(enemies.indexOf(enemy), 1);
        }
    });

    // Move lasers
    lasers.forEach((laser) => {
        laser.y -= laserSpeed;
        if (laser.y < 0) {
            lasers.splice(lasers.indexOf(laser), 1);
        }
    });

    // Check laser-enemy collisions
    lasers.forEach((laser) => {
        enemies.forEach((enemy) => {
            if (
                laser.x < enemy.x + enemyWidth &&
                laser.x + laserWidth > enemy.x &&
                laser.y < enemy.y + enemyHeight &&
                laser.y + laserHeight > enemy.y
            ) {
                enemies.splice(enemies.indexOf(enemy), 1);
                lasers.splice(lasers.indexOf(laser), 1);
                enemiesHit++;
            }
        });
    });

    // Display background
    ctx.drawImage(background, 0, 0);

    // Display player
    ctx.drawImage(playerImage, playerX, playerY);

    // Display enemies
    enemies.forEach((enemy) => {
        ctx.drawImage(enemyImage, enemy.x, enemy.y);
    });

    // Display lasers
    lasers.forEach((laser) => {
        ctx.drawImage(laserImage, laser.x, laser.y);
    });

    // Display player stats
    displayStats();

    // Check game over conditions
    if (playerLives <= 0 || playerHitpoints <= 0) {
        displayGameOver();
        setTimeout(() => {
            playerLives = 5;
            playerHitpoints = 7;
            level = 0;
            enemiesHit = 0;
            enemies = [];
            lasers = [];
            gameLoop();
        }, 2000);

        fetch('/juego2/gameover', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score: enemiesHit }),
        })
            .then(response => response.json())
            .then(data => {
            if (data.success) {
                console.log('Puntuación actualizada con éxito');
            } else {
                console.error('Error al actualizar la puntuación');
            }
            })
            .catch(error => {
            console.error('Error de red:', error);
            });

        return; // End the current game loop
    }

    // Check level completion
    if (enemies.length === 0) {
        level++;
        for (let i = 0; i < level * 2 + 5; i++) {
            enemies.push({
                x: Math.floor(Math.random() * (SCREEN_WIDTH - enemyWidth)),
                y: 0,
            });
        }
    }

    requestAnimationFrame(gameLoop); // Continue the game loop
}

// Start the game loop
gameLoop();


