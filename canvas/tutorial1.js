export let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
export let c = canvas.getContext('2d');

// drawing shapes using canvas;

// 1. Rectangle;
let colors = ['red','bule','green']
for(let i=1;i<=5;i++){
    c.fillStyle = colors[i];
    c.fillRect(50*i,20*i,10*i,30*i);   
}

// lines

c.beginPath()
// c.strokeStyle = 'red'
c.moveTo(100,100);
// c.strokeStyle = 'green';
c.lineTo(200,200);
c.strokeStyle = 'blue'
c.lineTo(300,300);
c.stroke()
// c.closePath();
///////
c.beginPath();
c.moveTo(400,400)
c.lineTo(window.innerWidth/2,window.innerHeight/2);
c.strokeStyle = 'red'
c.stroke()
c.closePath()    
////
//// arc or circle

setTimeout(()=>{
    for(let i=1;i<100;i++){
        c.beginPath();
        // let x = e 
        c.arc(window.innerWidth*Math.random(),window.innerHeight*Math.random(),50,0,Math.PI*2,1)
        c.strokeStyle = colors[Math.random()*3];
        c.stroke()
        c.closePath()
    }
    
},2000)
