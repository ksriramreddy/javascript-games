var borderMat = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
var rows = 4;
var columns = 4;
var score = 0;
 window.onload = function(){
    setGame(borderMat);
    setOneBox();
    setOneBox();
 }
 function setGame(borderMat){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            let box = document.createElement('div');
            box.id = i.toString() + "-" + j.toString();
            box.innerHTML = "";
            let num = borderMat[i][j];
            updateTile(box,num);
            // document.querySelector('.board').innerHTML=" ";
            document.querySelector('.board').appendChild(box);
        }
    }
 }
 function randomSelector(){
    let arr = [2];
    let index = Math.floor(Math.random()*1);
    // console.log(index,'i');
    let num = arr[index];
    return num
 }
 let boxFound = 1;
 let isGameOver = 0;
 function checkBox(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<columns;j++){
            if(borderMat[i][j]==0) return 1;
        }
    }
    return 0;
 }
 function checker(a){
    for(let i=0;i<a.length-1;i++){
        if(a[i]==a[i+1]) return 1;
    }
 }
 function isMovePossible(){
    let sum = 0;
    for(let i=0;i<columns;i++){
        let row1 = borderMat[i];
        let row2 = borderMat[i].reverse();
        // let col1 = [borderMat[][],borderMat[][],borderMat[][],borderMat[][]];
        sum+=checker(row1);
        sum+=checker(row2);         
    }

 }
 function setGameOver(){
    document.getElementById('1-0').innerText='G';
    document.getElementById('1-1').innerText='A';
    document.getElementById('1-2').innerText='M';
    document.getElementById('1-3').innerText='E';
    document.getElementById('2-0').innerText='O';
    document.getElementById('2-1').innerText='V';
    document.getElementById('2-2').innerText='E';
    document.getElementById('2-3').innerText='R';
    document.getElementById('3-3').innerText='';
    document.getElementById('3-1').innerText='';
    document.getElementById('3-2').innerText='';
    document.getElementById('3-0').innerText='';
    document.getElementById('0-1').innerText='';
    document.getElementById('0-2').innerText='';
    document.getElementById('0-0').innerText='';
    document.getElementById('0-3').innerText='';

 }

 function setOneBox(){
    if(!checkBox()){
        isGameOver = 1;
        setGameOver()
        return;
    }
    boxFound = 1;
    while(boxFound){
        let randomRow =Math.floor(Math.random()*4);
        let randomCol = Math.floor(Math.random()*4);
        if(borderMat[randomRow][randomCol]==0){
            // console.log("bnk")
            let box = document.getElementById(randomRow.toString()+"-"+randomCol.toString());
            let num = randomSelector();
            // console.log(num);
            boxFound = 0;
            box.classList.add("x"+num.toString())
            box.innerText = num;
            borderMat[randomRow][randomCol] = num;
        }
    }
 }
 function updateTile(box,num){
    box.innerText = "";
    box.classList.value = "";
    box.classList.add('box');
    document.getElementById('score').innerHTML = score
    if(num>0){
        box.innerText = num;
        if(num<4096)
        box.classList.add("x"+num.toString());
        else box.classList.add("x8912");
    }
 }
 document.addEventListener('keyup',(e)=>{ 
    if(e.key=="ArrowLeft"){
    slideLeft(); setOneBox()}
    else if(e.key=="ArrowRight"){
    sildeRight(); setOneBox()}
    else if(e.key=="ArrowUp"){
    sildeUp(); setOneBox()}
    else if(e.key=="ArrowDown") {sildeDown(); setOneBox()}
 })
// let isMovePossible = 0;
function slide(arr){
    arr = arr.filter((i)=>i!=0);
    for(let i=0;i<arr.length-1;i++){
        if(arr[i]==arr[i+1]){
            score+=(arr[i+1]+arr[i])
            arr[i]+=arr[i+1];
            arr[i+1] = 0;
        }
    }
    arr = arr.filter((i)=>i!=0);
    let size = arr.length;
    while(size<4){
        arr.push(0);
        size++;
    }
    return arr;
}
 function slideLeft(){
    for(let i=0;i<rows;i++){
        let row = borderMat[i];
        row = slide(row);
        borderMat[i] = row;
        for(let j=0;j<columns;j++){
            let num = borderMat[i][j];
            let box = document.getElementById(i.toString() +"-"+ j.toString());
            // console.log(box.id);
            updateTile(box,num);
        }
    }
    if(checkGameOver){
        isGameOver = 1;
    }
 }
 function sildeRight(){
    for(let i=0;i<rows;i++){
        let row = borderMat[i];
        row.reverse()
        row = slide(row);
        row.reverse();
        borderMat[i] = row;
        for(let j=0;j<columns;j++){
            let num = borderMat[i][j];
            let box = document.getElementById(i.toString() +"-"+ j.toString());
            // console.log(box.id);
            updateTile(box,num);
        }
    }
    if(checkGameOver){
        isGameOver = 1;
    }
 }
 function sildeUp(){
    for(let i=0;i<columns;i++){
        let row = [borderMat[0][i],borderMat[1][i],borderMat[2][i],borderMat[3][i]];
        row = slide(row);
        borderMat[0][i] = row[0];
        borderMat[1][i] = row[1];
        borderMat[2][i] = row[2];
        borderMat[3][i] = row[3];
        for(let j=0;j<rows;j++){
            let num = borderMat[j][i];
            let box = document.getElementById(j.toString() +"-"+ i.toString());
            // console.log(box.id);
            updateTile(box,num);
        }
    }
    if(checkGameOver){
        isGameOver = 1;
    }
 }
 function sildeDown(){
    for(let i=0;i<columns;i++){
        let row = [borderMat[0][i],borderMat[1][i],borderMat[2][i],borderMat[3][i]];
        row.reverse();
        row = slide(row);
        row.reverse();
        borderMat[0][i] = row[0];
        borderMat[1][i] = row[1];
        borderMat[2][i] = row[2];
        borderMat[3][i] = row[3];
        for(let j=0;j<rows;j++){
            let num = borderMat[j][i];
            let box = document.getElementById(j.toString() +"-"+ i.toString());
            // console.log(box.id);
            updateTile(box,num);
        }
    }
    if(checkGameOver){
        isGameOver = 1;
    }
 }

 function checkGameOver(){
    let f = 1;
    for(let i=0;i<rows-1;i++){
        for(let j=0;j<columns-1;j++){
            if(borderMat[i][j]==borderMat[i][j+1]){
                f = 0;
            }
        }
    }
    for(let i=0;i<columns-1;i++){
        for(let j=0;j<rows-1;j++){
            if(borderMat[i][j]==borderMat[i][j+1]){
                f = 0;
            }
        }
    }
    return f;
 }

 function resetGame(){
    
 }