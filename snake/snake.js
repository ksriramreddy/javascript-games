var blockSize = 20;
var col = 25;
var row = 25;
var c , board;
var gameOver = 0;
//snake head 
var snakeX = blockSize*10;
var snakeY = blockSize*10;
//food
var foodX,foodY;
// snake velocity
var velocityX = 0;
var velocityY = 0;
//snake body
var snakeBody = [];
window.onload = function(){
    board = document.querySelector('.board');
    board.height = row*blockSize;
    board.width = col*blockSize;
    board.style.backgroundColor = 'black'
    c = board.getContext('2d');
    document.addEventListener('keyup',moveSnake)
    // update();
    setInterval(() => {
        update();
    }, 100);
}
function update(){
    if(gameOver){
        snakeBody = []
        alert("game Over");
        return;
    }
    c.clearRect(0,0,row*blockSize,col*blockSize)
    c.fillStyle = "red";
    c.fillRect(snakeX,snakeY,blockSize,blockSize);
    c.fillStyle = 'lime';
    if(snakeX == foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY])
        placeFood();
    }
    for (let i = snakeBody.length-1;i>0;i--) {
         snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY]
    }
    snakeX +=(velocityX)*blockSize;
    snakeY +=(velocityY)*blockSize;
    c.fillRect(foodX,foodY,blockSize,blockSize);
    
    for (let i = 0; i < snakeBody.length; i++) {
        c.fillStyle = 'red'
        c.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize)
    }
    if(snakeX>row*blockSize || snakeX<0 || snakeY<0 || snakeY>col*blockSize){
        gameOver = 1;
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if(snakeBody[i][0] == snakeX && snakeBody[i][1] == snakeY){
            gameOver = 1;
            break;
        } 
    }
}
placeFood();
function placeFood(){
    foodX = Math.floor(Math.random()*row)*blockSize;
    foodY = Math.floor(Math.random()*col)*blockSize;
}
function moveSnake(e){
    if(e.code == 'ArrowUp' && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == 'ArrowDown' && velocityY!=-1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == 'ArrowRight' && velocityX!=-1){
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.code == 'ArrowLeft' && velocityX!=1){
        velocityX = -1;
        velocityY = 0;
    }

}