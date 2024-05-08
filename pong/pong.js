window.onload = function(){
    setGame();
}
let c;
let boardHeight = 500;
let boardWidth = 500;
let playerWidth = 10;
let playerHeight = 50;
let ballHeight = 10;
let ballWidth = 10;
let player1Sc = 0;
let player2Sc = 0;
let gameOver = 0;
var player1 = {
    x : 5,
    y : boardHeight/2,
    w : playerWidth,
    h : playerHeight,
    v : 0
}
var player2 = {
    x : boardWidth-playerWidth-5,
    y : boardHeight/2,
    w : playerWidth,
    h : playerHeight,
    v : 0
}
var ball = {
    h : ballHeight,
    w : ballWidth,
    x : boardHeight/2,
    y : boardWidth/2,
    xv : 2,
    yv : 1
}
function setGame(){
    let canvas = document.querySelector('canvas');
    canvas.height = boardHeight;
    canvas.width = boardWidth;
    canvas.style.backgroundColor = 'black'
    c = canvas.getContext('2d');
    c.fillStyle = 'skyblue'
    c.fillRect(player1.x,player1.y,player1.w,player1.h)
    c.fillRect(player2.x,player2.y,player2.w,player2.h)
    // c.fillRect(ball.x,ball.y,ball.h,ball.w)
    requestAnimationFrame(update)
    
}
let i = 1;
function update(){
    requestAnimationFrame(update)
    if(gameOver){
        setGame();
    }
    let nextPlayer1 = player1.y + player1.v
    if(!outOfBounce(nextPlayer1)){
        player1.y = nextPlayer1
    }
     let nextPlayer2 = player2.y + player2.v
    if(!outOfBounce(nextPlayer2)){
        player2.y = nextPlayer2
    }
    c.clearRect(0,0,500,500)
    c.fillStyle = 'skyblue'
    c.fillRect(player1.x,player1.y,player1.w,player1.h)
    c.fillRect(player2.x,player2.y,player2.w,player2.h)
    document.addEventListener('keyup',movePlayer)
    ball.y+=ball.yv
    ball.x+=ball.xv
    detectDetection1();
    if(ball.y+20>boardHeight|| ball.y-10<0){
        ball.yv*=-1;
    }
    c.fillStyle = 'white'
    c.fillRect(ball.x,ball.y,ball.h,ball.w);
    for(let i = 10;i<boardHeight ;i+=25){
        c.fillRect(boardWidth/2,i,5,5);
    }
    c.font = "45px sans-serif";
    c.fillText(player1Sc,100,50)
    c.fillText(player2Sc,350,50)
}
function movePlayer(e){
    if(e.code == 'KeyW'){
        player1.v = -2
    }
    else if(e.code == 'KeyS'){
        player1.v = 2
    }
    if(e.key == 'ArrowUp'){
        player2.v = -2
    }
    else if(e.key == 'ArrowDown'){
        player2.v = 2
    }
}
function outOfBounce(yPos){
    return (yPos<0 ||yPos+playerHeight>boardHeight)
}
function detectDetection1(){
    if(ball.x>boardWidth-25){
        if(ball.y>=player2.y-15 && ball.y<=player2.y+playerHeight+10){
            ball.xv*=-1
        }
        else{
            player1Sc++;
            restartGame(-1);
        }
    }
    if(ball.x<15){
        if(ball.y>=player1.y-15 && ball.y+10<=player1.y+playerHeight+10){
            ball.xv*=-1
        }
        else{
            player2Sc++;
            restartGame(1);
        }
    }
}
function restartGame(a){
    ball = {
        h : ballHeight,
        w : ballWidth,
        x : boardHeight/2,
        y : boardWidth/2,
        xv : 2*a,
        yv : 1
    }
}
