let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
function Circle1(x,y,vx,vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.draw = function(){
        c.beginPath();
        c.strokeStyle = 'red'
        c.fill = 'black'
        c.arc(this.x,this.y,10,0,Math.PI*2,1)
        c.stroke();
    }
    this.update = function (){
        if(this.x>window.innerWidth || this.x < 0){
            this.vx = -this.vx;
        }
        if(this.y>window.innerHeight || this.y<0){
            this.vy = -this.vy;
        }
        this.x+=this.vx;
        this.y+=this.vy;
        this.draw()
    }
}
// let cir = new Circle(500,200);

// cir.draw()

let mouseloc = {
    x1 : undefined,
    y1 : undefined
}
window.addEventListener('mousemove',function(ev){
    mouseloc.x1 = ev.x;
    mouseloc.y1 = ev.y;
})


let circles = [];
for(let i=0;i<100;i++){
    let x = Math.random()*window.innerWidth;
    let y = Math.random()*window.innerHeight;
    let vy = Math.random()*9;
    let vx = Math.random()*9;
    circles.push(new Circle1(mouseloc.x1,mouseloc.y1,vx,vy));
}
function animate (){
    requestAnimationFrame(animate)
    // console.log('b')
    c.clearRect(0,0,window.innerWidth,window.innerWidth);
    for(let i=0;i<100;i++){
        circles[i].update();
    }
}
animate();
// function drawCircle(){
//     c.beginPath();
//     c.arc(mouseloc.x,mouseloc.y,50,0,Math.PI*2,1);
//     c.stroke(); 
//     c.closePath();
// }

// function moveMouse(){
//     requestAnimationFrame(moveMouse)
//     c.clearRect(0,0,window.innerWidth,window.innerHeight)
//     drawCircle()
// }
// moveMouse()