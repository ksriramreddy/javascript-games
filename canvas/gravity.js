let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth*2;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
window.onload = function(){
    init()
    animate()
}
var radius = [20,25,30];
let color = ['#12a4d9','#d9138a','#e2d810']
let xMove = [-2,-1,0,1,2]
function Ball(x,y,dx,dy,rad,col){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.rad = rad;
    this.col = col;
    this.draw = function(){
        c.beginPath()
        c.arc(this.x,this.y,this.rad,0,Math.PI*2,false)
        c.fillStyle= this.col;
        c.fill()
        c.stroke()
        c.closePath()
    }
    this.update = function(){
        if(this.y+this.rad +this.dy>canvas.height){
            this.dy = -this.dy*0.7;
        }
        else{
            this.dy+=3;
        }
        if(this.x+this.rad + this.dx> window.innerWidth || this.x - this.rad <0){
            this.dx = -1 * this.dx;
        }
        this.x+=this.dx;
        this.y+=this.dy;
        this.draw()
    }
}
let balls = [];
function init(){
    for (let i = 0; i < 150; i++) {
        let radi = radius[Math.floor(Math.random()*3)]
        let y = Math.random()*canvas.height-radi;
        let x = Math.random()*canvas.width;
        let col = color[Math.floor(Math.random()*3) ]
        let dx = xMove[Math.floor(Math.random()*5)]
        console.log(radi);
        balls.push(new Ball(x,y,dx,10,radi,col));
        // b.draw();
    }
}
function animate(){
    requestAnimationFrame(animate)      
    c.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
    }
}
init()
function drawImage(){
    let image = new Image();
    image.src = "../chromedinosaur/dinorun.png";
    image.onload = function(){
        c.drawImage(image,10,10,10,10);
    }
}
// animate()