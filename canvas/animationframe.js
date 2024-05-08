let x = 1;
let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
 let c = canvas.getContext('2d');
function circlePopupAnimation(){
    // c.clearRect(0,0,innerWidth,innerHeight)
    c.beginPath()
    c.arc(100,100,x,0,Math.PI*2,0)
    c.stroke()
    c.closePath()
    c.beginPath()
    c.arc(200,200,x,0,Math.PI*2,0)
    c.stroke()
    c.closePath()
    c.beginPath()
    c.arc(300,300,x,0,Math.PI*2,0)
    c.stroke()
    c.closePath()
    x++
    if(x==50)x=0;
}
//object;

function Circle(movex,movey,veloityX,veloityY){
    this.movex = movex;
    this.movey = movey;
    this.veloityX = veloityX;
    this.veloityY = veloityY;   
    this.draw = function(){
        c.beginPath();
        c.arc(this.movex,this.movey,5,0,Math.PI*2,1);
        c.strokeStyle = 'red    '
        c.fill();
        c.stroke();
    }
    this.update = function(){
        if(this.movey<0 || this.movey>window.innerHeight) this.veloityY=-this.veloityY;
        if(this.movex<0 || this.movex>window.innerWidth) this.veloityX=-this.veloityX;
        this.movex+=this.veloityX;
        this.movey+=this.veloityY;
        this.draw()
    }
}

let circles = [];
for(let i=0;i<100;i++){
    let x = Math.random()*(window.innerWidth-100)+100;
    let y = Math.random()*(window.innerHeight-100)+100;
    let dy = Math.random()*10;
    let dx = Math.random()*10;
    circles.push(new Circle(x,y,dx,dy))
}
console.log(circles);
// function
let movex = 50 ;
let movey = 50;
let veloityY = 5;
let veloityX = 5;
// let circle = new Circle(movex,movey,veloityX,veloityY)


function animate(){ 
    requestAnimationFrame(animate)
    c.clearRect(0,0,window.innerWidth,window.innerWidth)
    // circle.update()
    // console.log(circle)
    for(let i=0;i<circles.length;i++) circles[i].update();
}
animate()