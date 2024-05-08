var boardHeight = 600;
var boardWidth = 350;
var c , canvas;
var backgroundImg = new Image();
var doodleX = 145;
var doodleY = boardHeight-100;
var doodleLeft = new Image();
var doodleRight = new Image();
var velocityX = 0;
var velocityY = 0;
var maxHeight = 250;
var platformX = 0;
var platformW = 50;
var platformH = 20;
var gravity = 0;
var temp = 0;
var platformVelY = 0;
var platformImg = new Image();
platformImg.src = "images/tile.png";
let gameOver = 0;
var platformarr = [];
for (let i = 0; i <700; i+=50) {
    let placeX = Math.floor(Math.random()*boardWidth);
    let platform = {
        x : placeX,
        y : i,
        img : platformImg,
        h : platformH,
        w : platformW   
    }
    platformarr.push(platform);
}
console.log(platformarr);       
var doodle = {
    x : doodleX,
    y : doodleY,
    w : 50,
    h : 50,
    img : new Image()
}
window.onload = function (){
    canvas = document.querySelector('canvas');
    canvas.width = boardWidth;
    canvas.height = boardHeight;
    c = canvas.getContext('2d');
    backgroundImg.src = "images/doodlebg.png";
    backgroundImg.onload = ()=> 
        c.drawImage(backgroundImg,0,0,boardWidth,boardHeight);
    doodleLeft.src = "images/doodleleft.png";
    doodleRight.src = "images/doodleright.png";
    platformImg.onload = ()=> c.drawImage(platformImg,200,100,40,10);
    doodle.img = doodleRight;
    doodleLeft.onload = ()=>c.drawImage(doodle.img  ,doodle.x,doodle.y,doodle.w,doodle.h);
    document.addEventListener('keydown',moveDoodle);
    c.font = "20px sans-serif";
    c.fillText("Enter Space to Start the game",100,100);
    update();
}
setInterval(() => {
    createPlatform()
},80);
function update(){
    requestAnimationFrame(update);
    if (gameOver) {
        c.fillText("Enter Space to Start the game",50,boardHeight-210);
        return;
    }
    c.clearRect(0,0,boardWidth,boardHeight);
    c.drawImage(backgroundImg,0,0,boardWidth,boardHeight);
    if(velocityX<0){
        doodle.x+=velocityX;
        velocityX+=0.5
    }
    if(velocityX>0){
        doodle.x+=velocityX;
        velocityX-=0.5;
    }
    doodleOutofBounce();
    doodle.y = Math.max(doodle.y+velocityY,maxHeight)
    velocityY+=gravity; 
    if(doodle.y+doodle.h/2>boardHeight){
        gameOver = 1;
    }
    for(let i = 0; i < platformarr.length; i++) {
        if(doodle.y+doodle.h>=platformarr[i].y && doodle.y+doodle.h<=platformarr[i].y+platformarr[i].h){
             if(doodle.x+doodle.w-13>platformarr[i].x && doodle.x+12<platformarr[i].x+platformarr[i].w && velocityY>0){
                velocityY = -10;
             }
        }
        if(doodle.y == maxHeight){
            platformVelY=10;
        }
        if(platformVelY>0) {platformVelY-=0.3;
        platformarr[i].y+=platformVelY;}
        c.drawImage(platformarr[i].img,platformarr[i].x,platformarr[i].y,platformarr[i].w,platformarr[i].h)
    }
    c.drawImage(doodle.img,doodle.x,doodle.y,doodle.w,doodle.h);
}
function moveDoodle(e){
    if(e.code == "Space" ){
        gravity = 0.5;
        velocityY = -12;
        gameOver = 0;
    }
    else if(e.code=='ArrowLeft'){
        doodle.img = doodleLeft;
        velocityX = -5;
    }
    else if(e.code == 'ArrowRight'){
        doodle.img = doodleRight;
        velocityX = 5;
    }
}
function doodleOutofBounce(){
    if(doodle.x+doodle.w<0){
        doodle.x = boardWidth;
    }
    if(doodle.x>boardWidth){
        doodle.x = 0-doodle.w;
    }
}
function createPlatform(){
    let placeX = Math.floor(Math.random()*boardWidth)-50;
    let platform = {
        x : placeX,
        y : temp,
        img : platformImg,
        h : platformH,
        w : platformW
    }
    temp-=45;
    platformarr.push(platform);
    if(platformarr.length>700){
        platformarr.shift()
    }
}