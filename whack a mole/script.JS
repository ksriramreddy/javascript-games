let isGameOver = 0;
window.onload = function(){
    loadGame();
}
function loadGame(){
    for(let i = 0;i<9;i++){
        let grid = document.createElement('div');
        grid.id = (i.toString());
        grid.addEventListener('click',selectMole)
        document.querySelector('.playground').appendChild(grid);
    }
    setInterval(() => {
        setMario();
    }, 2000);           
    setInterval(() => { 
        removeTree();
    }, 1999);
}
function randomNum(){
    return Math.floor(Math.random()*9).toString();
}
let placeMario;
let num;
function setMario(){
    if(isGameOver) return;
    if(placeMario){
        placeMario.innerHTML = "";
    }
    let mario = document.createElement('img');
    mario.src = "mole.png";
    num = randomNum();
    placeMario = document.getElementById(num);
    placeMario.appendChild(mario);
    setTree()
}
let placeTree;
function setTree(){
    if(isGameOver) return;
    let treeNum =45- 45-parseInt(-num);
    
    
    for(let i=0;i<=8;i++){
        if(i==treeNum) continue;
        let tree = document.createElement('img');
        tree.src = 'tree.png';
        // if(placeTree){
        //     placeTree.innerHTML = "";
        // }
        console.log(i);
        placeTree = document.getElementById(i.toString());
        placeTree.appendChild(tree); 
    }
}
function removeTree(){
    if(isGameOver) return;
    let treeNum =45- 45-parseInt(-num);
    for(let i=0;i<=8;i++){
        if(i==treeNum) continue;
        let placeTree = document.getElementById(i.toString());
        placeTree.innerHTML="";
    }
}
let score = 0;
function selectMole(){
    if(isGameOver) return;
    if(this == placeMario){
        score+=10;
        document.querySelector('.score').innerText ="score: " + score.toString();
    }
    else{
        document.querySelector('.score').innerText ="Game Ended Total score: " + score.toString();
        isGameOver = 1;
    }
}

