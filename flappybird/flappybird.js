const boardHeight = 500;
const boardWidth = 400;
var backgroungImg = new Image();
var canvas , c;
const birdWidth = 30;
const birdHeight = 30;
var pipeWidth = 60;
document.addEventListener('keydown',moveBird);
let topImage = new Image();
let downImage = new Image();
var toppipeY = 0;
var toppipeX = boardWidth;
var toppipeH = null;
var downpipeX = boardWidth;
var downpipeY = null;
var downpipeH = 500;
var velocityY = 0;
var gravity = 0.4;
var score  = 0;
let pipes = [];
let gameOver  = 0;
var f = 0;
let gap = [
    [140,280],
    [190,330],
    [240,380]
];
var bird = {
    x : 50,
    y : 220,
    img : new Image(),
    h : 30,
    w : 37
}
var background = {
    img : new Image(),
    x : 0,
    y : 0,
    h : boardHeight,
    w : boardWidth
}

// document.addEventListener('keypress',update)
window.onload = function(){
    canvas = document.getElementById('board');
    canvas.height = boardHeight;
    canvas.width = boardWidth;
    c = canvas.getContext('2d');
    background.img.src = 'images/background.png';
    bird.img.src = "images/bird.png";
    background.img.onload = function(){
        c.drawImage(background.img,background.x,background.y,background.w,background.h);
        // c.drawImage()
    }
    bird.img.onload = function(){
        c.drawImage(bird.img,bird.x,bird.y,bird.w,bird.h);
    }
    c.font = "45px sans-serif";
    c.fillText("hello",50,50)
    topImage.src =  "images/tunneldown.png";
    downImage.src =  "images/tunnelup.png";
    topImage.onload = function(){
        c.drawImage(topImage,300,0,65,200)
    }
    downImage.onload = function(){
        c.drawImage(downImage,300,350,65,500)
    }
    
    setInterval(() => {
        placePipes();
    }, 1000);
    update();
}
function update(){
    requestAnimationFrame(update)
    console.log("hgfdfg");
    if(gameOver){
        c.fillText("GAME OVER",70,250)
        return;
    }
    c.clearRect(0,0,boardWidth,boardHeight);
    // background.x-=.1;
    bird.y+=velocityY;
    velocityY+=.4
    c.drawImage(background.img,background.x,background.y,background.w,background.h);
    c.drawImage(bird.img,bird.x,bird.y,bird.w,bird.h);
    for(let i=0;i<pipes.length;i++){
        pipes[i].x-=3;
        if(bird.y<0 || bird.y>boardHeight){
            gameOver = 1;
        }
        if(
           bird.x+bird.w > pipes[i].x &&
           bird.x < pipes[i].x+pipes[i].w)
        {
            f = 1;
            if( pipes[i].img.src.includes('down') && (bird.y<pipes[i].h || bird.y+bird.h >pipes.h+40)){
                gameOver = 1;

            }
            else if(pipes[i].img.src.includes('up') && bird.y+bird.h>pipes[i].y){
                gameOver = 1;
                console.log('j');
            }
            if(f == 1 && bird.x+bird.w > pipes[i].x+pipes[i].w){
                score++;
                f = 0;
            }
        }
        c.drawImage(pipes[i].img,pipes[i].x,pipes[i].y,pipes[i].w,pipes[i].h);
        c.font = "45px sans-serif";
        c.fillText(parseInt(score/24),boardWidth/2-10,50);
    }
}
function placePipes(){
    let chance = gap[Math.floor(Math.random()*3)];
    let topPipe = {
        x : toppipeX,
        y : toppipeY,
        h : chance[0],
        w : pipeWidth,
        img : topImage
    }
    let downPipe = {
        x : downpipeX,
        y : chance[1],
        h : downpipeH,
        w : pipeWidth,
        img : downImage
    }
    pipes.push(topPipe);
    pipes.push(downPipe);
    if(pipes.length>8){
        pipes.shift();
    }
}
function moveBird(e){
    if(e.code == 'Space' || e.code == 'ArrowUp'){
        velocityY = -6;    
    if(gameOver){
        score = 0;
        f = 0;
        pipes = [];
        bird.y = 220
        gameOver = 0;
    }
    }
    
}