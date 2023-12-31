const platformImage = document.getElementById('platformImage')
const backgroundImage = document.getElementById('backgroundImage')
const hillsImage = document.getElementById('hillsImage')
const spriteRunLeft = document.getElementById('spriteRunLeft')
const spriteRunRight = document.getElementById('spriteRunRight')
const spriteStandLeft = document.getElementById('spriteStandLeft')
const spriteStandRight = document.getElementById('spriteStandRight')

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.2
const gameSpeed = 1;
class Player {
    constructor(){
        this.speed = 4
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 66
        this.height = 150
        this.frame = 0
        this.spriteStandRight=spriteStandRight
        this.sprites = {
            stand:{
                right: spriteStandRight,
                left: spriteStandLeft,
                cropWdith:177,
                width:66
            },
            run:{
                right: spriteRunRight, 
                left: spriteRunLeft, 
                cropWdith:341,
                width:127.875
            }
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }

    draw(){
        c.drawImage(this.currentSprite,this.currentCropWidth* this.frame,0,this.currentCropWidth,400, this.position.x, this.position.y,
            this.width, this.height)
    }

    update(){
        this.frame++;
        if (this.frame > 59 && this.currentSprite === (this.sprites.stand.right || this.speed.stand.left)) this.frame = 0;
        else if (this.frame > 29 && (this.currentSprite === this.sprites.run.right || this.sprites.run.left)) this.frame = 0;
        this.draw();
        this.position.y += this.velocity.y * gameSpeed; // Adjusted for game speed
        this.position.x += this.velocity.x * gameSpeed; // Adjusted for game speed
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity * gameSpeed; // Adjusted for game speed
        }
    }
}

class Plataform{
    constructor({x,y}){
        this.position = {
           x,
           y
        }
        this.platformImage = platformImage
        this.width = platformImage.width
        this.height = platformImage.height
    }
    draw(){
        c.drawImage(this.platformImage, this.position.x, this.position.y)
    }
}

class Background{
    constructor({x,y}){
        this.position = {
           x,
           y
        }
        this.backgroundImage = backgroundImage
        this.width = backgroundImage.width
        this.height = backgroundImage.height
        
    }
    draw(){
        c.drawImage(this.backgroundImage, this.position.x, this.position.y)
    }
}

class Hills{
    constructor({x,y}){
        this.position = {
           x,
           y
        }
        this.hillsImage = hillsImage
        this.width = hillsImage.width
        this.height = hillsImage.height
        
    }
    draw(){
        c.drawImage(this.hillsImage, this.position.x, this.position.y)
    }
}
class MovingPlatform extends Plataform {
    constructor({ x, y, speed }) {
        super({ x, y });
        this.speed = speed;
    }

    update() {
        this.position.x += this.speed;
    }
}

class FloatingPlatform extends Plataform {
    constructor({ x, y }) {
        super({ x, y });
    }

    draw() {
        c.drawImage(this.platformImage, this.position.x, this.position.y);
    }

    // You can add any specific logic for floating platforms here
}
class MovingAirPlatform extends MovingPlatform {
    constructor({ x, y, speed }) {
        super({ x, y, speed });
        this.position.y -= 200; // Adjust the height of the moving air platform
    }

    update() {
        super.update();
        // Add any specific logic for moving air platforms here
    }
}

let background =[]
let hills =[]
let player = new Player()
let plataforms = []
let airPlataforms = [];
let startTime;
let gameOver = false;

plataforms.push(
     new Plataform({ x: platformImage.width * 5 + 500, y: 470 }),
    new Plataform({ x: platformImage.width * 6 + 700, y: 470 }),
    new Plataform({ x: platformImage.width * 7 + 900, y: 470 }),
    new Plataform({ x: platformImage.width * 8 + 1100, y: 470 }),
    new Plataform({ x: platformImage.width * 9 + 1300, y: 470 }),
    new MovingPlatform({ x: platformImage.width * 10 + 1500, y: 470, speed: 2 }),
    new Plataform({ x: platformImage.width * 11 + 1700, y: 470 }),
    new Plataform({ x: platformImage.width * 12 + 1900, y: 470 }),
    new Plataform({ x: platformImage.width * 13 + 2100, y: 470 }),
    new Plataform({ x: platformImage.width * 14 + 2300, y: 470 }),
    new Plataform({ x: platformImage.width * 15 + 2500, y: 470 }),
    new Plataform({ x: platformImage.width * 16 + 2700, y: 470 }),
    new Plataform({ x: platformImage.width * 17 + 2900, y: 470 }),
    new MovingPlatform({ x: platformImage.width * 18 + 3100, y: 470, speed: -2 }),
    // Floating platforms
    new FloatingPlatform({ x: platformImage.width * 3 + 500, y: 300 }),
    new FloatingPlatform({ x: platformImage.width * 7 + 800, y: 200 }),
    new FloatingPlatform({ x: platformImage.width * 12 + 1200, y: 350 }),
    // Add more platforms or moving platforms as needed
    new MovingAirPlatform({ x: platformImage.width * 20 + 2500, y: 200, speed: 2 }),
    new MovingAirPlatform({ x: platformImage.width * 23 + 2900, y: 300, speed: -2 }),
);
let jumpWidth = 200; // Initial jump width
let longerJumpWidth = 400;
let keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    },
    up: {
        pressed: false  // Add this line to define the 'up' property
    }
}

let scrollOffset = 0

function init(){
    startTime = new Date().getTime();
    background =[new Background({
        x:-1,
        y:-1
    })]
    
    hills =[new Hills({
        x:0,
        y:0
    })]
    player = new Player()
    plataforms = [new Plataform({
        x: -1, y: 470
    }), new Plataform({
        x: platformImage.width -4, y: 470
    }),new Plataform({
        x: platformImage.width*2 + 100, y: 470
    }),new Plataform({
        x: platformImage.width*3 + 300, y: 470
    }),new Plataform({
        x: platformImage.width*3 + 300, y: 470
    }),new Plataform({
        x: platformImage.width*4 + 300 -2, y: 470
    })]
    plataforms.push(
        new Plataform({ x: platformImage.width * 5 + 500, y: 470 }),
        new Plataform({ x: platformImage.width * 6 + 700, y: 470 }),
        new Plataform({ x: platformImage.width * 7 + 900, y: 470 }),
        new Plataform({ x: platformImage.width * 8 + 1100, y: 470 }),
        new Plataform({ x: platformImage.width * 9 + 1300, y: 470 }),
        new MovingPlatform({ x: platformImage.width * 10 + 1500, y: 470, speed: 2 }),
        new Plataform({ x: platformImage.width * 11 + 1700, y: 470 }),
        new Plataform({ x: platformImage.width * 12 + 1900, y: 470 }),
        new Plataform({ x: platformImage.width * 13 + 2100, y: 470 }),
        new Plataform({ x: platformImage.width * 14 + 2300, y: 470 }),
        new Plataform({ x: platformImage.width * 15 + 2500, y: 470 }),
        new Plataform({ x: platformImage.width * 16 + 2700, y: 470 }),
        new Plataform({ x: platformImage.width * 17 + 2900, y: 470 }),
        new MovingPlatform({ x: platformImage.width * 18 + 3100, y: 470, speed: -2 }),
        // Floating platforms
        new FloatingPlatform({ x: platformImage.width * 3 + 500, y: 300 }),
        new FloatingPlatform({ x: platformImage.width * 7 + 800, y: 200 }),
        new FloatingPlatform({ x: platformImage.width * 12 + 1200, y: 350 }),
        // Add more platforms or moving platforms as needed
    );

    jumpWidth = 200; // Reset jump width
    scrollOffset = 0
}

function animate(){
    if (gameOver) {
        return;
    }
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0, canvas.width, canvas.height)
    background.forEach(background => {
        background.draw()
    });
    hills.forEach(hill => {
        hill.draw()
    });
    plataforms.forEach(plataform => {
        plataform.draw()
    });
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
    } else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += player.speed;
            background.forEach(background => {
                background.position.x -= player.speed * 0.66;
            });
            hills.forEach(hill => {
                hill.position.x -= player.speed * 0.66;
            });
            plataforms.forEach(plataform => {
                plataform.position.x -= player.speed;
                if (plataform instanceof MovingPlatform) {
                    plataform.update();
                }
            });
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed;
            background.forEach(background => {
                background.position.x += player.speed * 0.66;
            });
            hills.forEach(hill => {
                hill.position.x += player.speed * 0.66;
            });
            plataforms.forEach(plataform => {
                plataform.position.x += player.speed;
                if (plataform instanceof MovingPlatform) {
                    plataform.update();
                }
            });
        }
    }

    plataforms.forEach(plataform => {
        //colision de la plataforma
        if(player.position.y + player.height <= plataform.position.y 
            && player.position.y + player.height + player.velocity.y >= plataform.position.y 
            && player.position.x + player.width >= plataform.position.x
            && player.position.x <= plataform.position.x + plataform.width){
            player.velocity.y = 0;
        }
        if (keys.up && keys.up.pressed && player.velocity.y === 0) {
            player.velocity.y -= 10;
            player.position.x += longerJumpWidth; // Increase jump width
        }
    });

    //win condition
    if(scrollOffset > 14000 && !gameOver){
        gameOver = true;
        const endTime = new Date().getTime();
        const totalTime = (endTime - startTime) / 1000; // Tiempo en segundos
        const newScore = Math.floor(10000 / totalTime);

        // Enviar la puntuación al servidor
        fetch('/juego/gameover', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score: newScore }),
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

        const winMessage = `You win! Time: ${totalTime.toFixed(2)} seconds`;

        // Medir el ancho y la altura del texto
        const messageWidth = c.measureText(winMessage).width;

        // Centrar el mensaje en la pantalla
        const centerX = canvas.width / 2 - messageWidth / 2;
        const centerY = canvas.height / 2;

        c.fillStyle = 'white';
        c.font = '30px Arial';
        c.fillText(winMessage, centerX, centerY); 
    }
    if(player.position.y > canvas.height){
        init()
    }
}

init()
animate()

addEventListener('keydown', ({ keyCode }) => {

    switch(keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWdith
            player.width = player.sprites.run.width
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWdith
            player.width = player.sprites.run.width
            break
        case 87:
            console.log('up')
            player.velocity.y -= 10
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {

    switch(keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = false
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWdith
            player.width = player.sprites.stand.width
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWdith
            player.width = player.sprites.stand.width
            break
        case 87:
            console.log('up')
            break

    }
})