var boardWidth = 700;
var boardHeight = 200;
let canvas , c;
var dinoX = 10;
var dinoY = 120;
var dinoW = 50;
var dinoH = 70;
var jumpHeight  = 60;
var gravity = .4;
var cactusX = 700;
var cactusY = 130;
var cactusV = -10;
var obstaicelW = 30;
var obstaicelH = 30;
var score = 0;
let dinoImg = {
    x : dinoX,
    y : dinoY,
    w : dinoW,
    h : dinoH,
    img :new Image(),
    vy : 0
}
var gameOver = 0

function detectCollision(a,b){
    return ((a.x+a.w > b.x) && (a.x<b.x+b.w) && (a.y<b.y+b.h) && (a.y+a.h>b.y));
}

setInterval(() => {
    score+=1;
}, 100);

var cacArr = [];
function placeCac(){
    var cactus = {
        x : cactusX,
        y : cactusY,
        w : 10,
        h : 10,
        img : new Image()
    }
    cactus.img.src = "imges/fire.gif";
    let chance = Math.random();
    if(chance>0.5) cactus.x = 800;
    else if(chance<.2){
        cactus.x = 600;
    }
    cacArr.push(cactus);
    if(cacArr.length>5) cacArr.shift()
}
setInterval(() => {
    placeCac();
}, 1000);
dinoImg.img.classList.add('dinoImg')
let Road = function(x,y,w) {
    this.x = x;
    this.y = y;
    this.w = w;
}
let roadX = [boardHeight-13,boardHeight-10];
let readW = [2,4];
let readGap = [5,7];
var roadArr = [];
var image;
function createRoad(){
    roadArr  = []
    for(i=0;i<1500;i+=20){
        let y = roadX[Math.floor(Math.random()*2)];
        let x = i+readGap[Math.floor(Math.random()*2)]
        let w = readW[Math.floor(Math.random()*2)]
        roadArr.push(new Road(x,y,w));
    }
}
createRoad()
window.onload = function(){
    canvas = document.getElementById('board');
    canvas.height = boardHeight;
    canvas.width = boardWidth;
    c = canvas.getContext('2d');
    c.fillStyle = 'rgb(139, 138, 138)'
    c.fillRect(0,boardHeight-20,boardWidth,1)
    for (let i = 0; i < roadArr.length; i++) {
        c.fillRect(roadArr[i].x,roadArr[i].y,roadArr[i].w,2);
    }
    dinoImg.img.src = "imges/naruto1.png";
    dinoImg.img.style.filter = 'dropShadow(10px 10px 1px)';
    c.drawImage(dinoImg.img,dinoImg.x,dinoImg.y,dinoImg.w,dinoImg.h);
    console.log(dinoImg.img.src);
    // console.log(Image);
    update();
}
setInterval(() => {
    changeImage();
}, 80);
function update(){ 
    requestAnimationFrame(update);
    if(gameOver) return;
    c.clearRect(0,0,boardWidth,boardHeight);
    c.fillStyle = "green"
    c.fillRect(0,boardHeight-20,boardWidth,1);
    for(let i = 0; i < roadArr.length; i++) {
        c.fillRect(roadArr[i].x,roadArr[i].y,roadArr[i].w,2);
    }
    dinoImg.vy+=gravity;
    dinoImg.y = Math.min(dinoY,dinoImg.y+dinoImg.vy);
    if(dinoImg.y == jumpHeight) dinoImg.vy = 0;
    for(i = 0;i<roadArr.length;i++){
        roadArr[i].x-=5;
    }
    if(roadArr[roadArr.length-1].x < boardWidth-50){
        createRoad();
    }
    c.drawImage(dinoImg.img,dinoImg.x,dinoImg.y,dinoImg.w,dinoImg.h);
    for (let i = 0; i < cacArr.length; i++) {
        cacArr[i].x+=cactusV;
        c.drawImage(cacArr[i].img,cacArr[i].x,cacArr[i].y,70,50);
        if(detectCollision(dinoImg,cacArr[i])){
                gameOver = 1;
        }
    }
    c.fillStyle = "black";
    c.font = "20px sans-serif";
        c.fillText("score :" + score ,boardWidth-100,50);
    
    // changeImage()
    document.addEventListener('keydown',moveDino);
}
function changeImage(){
    if(!gameOver)
    if(dinoImg.img.src.includes("naruto1")){
        dinoImg.img.src.replace('1','2');
        dinoImg.img.src = "imges/naruto2.png";
    }
    else if(dinoImg.img.src.includes("naruto2")){
        dinoImg.img.src = "imges/naruto3.png";
    }
    else dinoImg.img.src = "imges/naruto1.png";  
}
function moveDino(e){
    console.log(e.code);
    if((e.code == 'Space' || e.code == 'ArrowUp') && dinoImg.y == dinoY){
        dinoImg.vy=-10;
    }
}