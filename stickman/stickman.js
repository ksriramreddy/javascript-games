let boardHeight = 500;
let boardWidth = 900;
let pillerWidth = [40,80,90,120];
let pillerHeight = boardHeight/2;
let gap = [100,120,140]
let stickManHeight = 60;
let stickManWidth = 60;
let stickManX = 163;
let stickManY = boardHeight/2-60;
let stickHeight = stickManY+stickManHeight;
let stickWidth = stickManX+stickManWidth;
let stickX = stickWidth;
let stickY = stickHeight;
let incStick = 0;
let stickChance = 1;
let stickFallChance = 0;
let stickManChance = 0;
let pillerChance = 0;
let stickFallX = 0;
let stickFallY = 0;
let height = 0;
let initialPosition = stickManX;
let movement = null;
let isCorrect = null;
let moveLenght = 0;
let stickManFall = 0;
let score = 0;  
let isGameOver = 0;
var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d');
var stickMan = new Image()
window.onload = function(){
    canvas.height = boardHeight;
    canvas.width = boardWidth;
     
    c.fillStyle = 'black'
    for(let i=0;i<pillers.length;i++){
        c.fillStyle = 'black';
        c.fillRect(pillers[i].x,pillers[i].y,pillers[i].w,pillers[i].h)
    }
    // c.fillRect(stickX,stickY,stickWidth,stickHeight)
    stickMan.src = '/stickman/images/Stickmanhero.png'
    stickMan.onload = function(){
        c.drawImage(stickMan,stickManX,stickManY,stickManWidth,stickManHeight)
    }
    c.beginPath();
    c.moveTo(stickX,stickY);
    c.lineTo(stickWidth,stickHeight)
    c.stroke()
    c.closePath();

    document.addEventListener('keydown',(e)=>{
        if(e.code === 'Space' && stickChance)
        incStick = 2;
    })
    document.addEventListener('keyup',(e)=>{
        if(e.code === 'Space' && stickChance){
            incStick = 0;
            // stickFallX = 1;
            // stickFallY = 1;
            stickChance = 0;
            stickFallChance = 1;
        }
    })
    document.addEventListener('keypress',(e)=>{
        if(e.code === 'Enter' && isGameOver){
            location.reload();
        }
    })
    requestAnimationFrame(update)
}
var pillers = []
pillers.push(
    {
        x : 20,
        y: boardHeight/2,
        w : 60,
        h : pillerHeight
    },
    {
        x : 160,
        y: boardHeight/2,
        w : 90,
        h : pillerHeight
    },  
    {
        x : 330,
        y: boardHeight/2,
        w : 70,
        h : pillerHeight
    },
    {
        x : 540,
        y: boardHeight/2,
        w : 70,
        h : pillerHeight
    },
    {
        x : 740,
        y: boardHeight/2,
        w : 70,
        h : pillerHeight
    },
    {
        x : 860,
        y: boardHeight/2,
        w : 70,
        h : pillerHeight
    }
    
)
function createPillers (){
    let pillerW = pillerWidth[Math.floor(Math.random()*4)];
    let pillerX = pillers[pillers.length-1].x+pillers[pillers.length-1].w + gap[Math.floor(Math.random()*3)]
    console.log( pillers[pillers.length-1].x+pillers[pillers.length-1].w , gap[Math.floor(Math.random()*3)] );
    pillers.push({
        x : pillerX, 
        y : boardHeight/2,
        w : pillerW,
        h : pillerHeight
    });   
    if(pillers.length > 15) pillers.shift();    
}

// setInterval(() => {
//     createPillers();
// }, 800);

function update(){
    requestAnimationFrame(update);
    c.clearRect(0,0,boardWidth,boardHeight);
    if(isGameOver){
        c.font = "30px sans-serif";
        c.fillText("Press Enter to Restart",300,100);
    }
    c.drawImage(stickMan,stickManX,stickManY,60,60)
    c.font = "30px sans-serif";
    c.fillText(score,boardWidth/2,150);
    c.beginPath();
    c.moveTo(stickX,stickY);
    c.lineTo(stickWidth,stickHeight)
    c.stroke()
    c.closePath();
    for(let i=0;i<pillers.length;i++){
        c.fillStyle = 'black';
        c.fillRect(pillers[i].x,pillers[i].y,pillers[i].w,pillers[i].h)
        // pillers[i].x -= 5;
    }
    // c.fillStyle = 'red'
    // c.fillRect(stickX,stickY,stickWidth,stickHeight)
    if(stickChance){
        // stickWidth-=incStick;
        height+=incStick;
        stickHeight-=incStick;
        // stickX+=stickFallX;
        // stickY+=stickFallY;
        
        
    }
    if(stickFallChance){
        stickWidth = stickX+height;
        stickHeight = stickY;
        [movement ,isCorrect,lastPillerPos] = checkStickFalledCorrectly();
        if(isCorrect) score++;
        // moveLenght = movement - stickManX;
        stickFallChance = 0;
        stickManChance = 1; 
        createPillers()  
        console.log(isCorrect);
    }
    if(stickManChance){

        // console.log(movement);
        if(isCorrect){
            stickManX += 3;
            if(stickManX >= movement){
                stickManChance = 0;
                pillerChance = 1;
            }
        }
        else{
            stickManX += 3;
            if(stickManX >= movement){
                stickManChance = 0;
                stickManFall = 1;
            }
        }
    }
    if(stickManFall ){
        stickManY += 5;
        stickHeight+=4;
        stickY += 4;
        if(stickManY >= boardHeight){
            isGameOver = true;
        }
    }
    if(pillerChance){
        for(let i = 0;i<pillers.length;i++){
            pillers[i].x-=3;
        }
        stickManX -= 3;
        stickX -= 3;
        stickWidth -= 3; 

        if(stickManX <= initialPosition){
            pillerChance = 0;
            stickHeight = stickManY+stickManHeight;
            stickWidth = stickManX+stickManWidth;
            stickX = stickWidth;
            stickY = stickHeight;
            height = 0;
            stickChance = 1;
        }
    }
}
function checkStickFalledCorrectly(){
    let movement = 0;
    let isCorrect = false;
    let lastPillerPos;
    for(let i=0;i<pillers.length;i++){
        if(stickWidth >= pillers[i].x && stickWidth <= pillers[i].x+pillers[i].w){
            movement = pillers[i].x;
            lastPillerPos = pillers[i].x+pillers[i].w;
            isCorrect = true;
        }
    }
    if(!isCorrect){
        movement = stickWidth - stickManWidth;
    }
    return [movement,isCorrect];
}