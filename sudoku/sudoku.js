let selectedNum = undefined;
let hintChan = 90;
let newboard = 0;
let questions;
let solutions;
let previous = -1;
window.onload = function(){
    setGame();
    // setNewBoard()
}
function setGame(){
    for(let i=0;i<9;i++){
        for(let j = 0;j<9;j++){
            let box = document.createElement('div');
            box.classList.add('box');
            box.classList.add(`${i.toString()}-${j.toString()}`);
            box.id = i.toString()+"-"+j.toString();
            if(i==2 || i==5){
                box.classList.add('dark1');
            }
            if(j==2 || j==5){
                box.classList.add('dark2');
            }
            box.addEventListener('click',()=>{
                if(!newboard){
                    alert('load a new game first');
                    return;
                }
                if(selectedNum == undefined){
                    alert("select a number to place");
                    return;
                }
                if(box.style.backgroundColor != 'rgb(216, 218, 221)'){
                    box.innerText=selectedNum;
                }
                // console.log(box.className);
            })
            let board = document.querySelector('.board');
            board.appendChild(box);
        }
        let number = document.createElement('div');
        number.classList.add('number');
        number.innerText = i+1;
        number.classList.add(`${(i+1).toString()}`);
        number.addEventListener('click',()=>{
            selectedNum = parseInt(i+1);
            // console.log(selectedNum)
            // number.classList.toggle("toggle")
            
            // console.log(i+1);
            // if(previous!=-1){
            //     document.getElementsByClassName(`${previous}`)[0].classList.toggle("number");
            // }
            // previous = i+1;
        })
        
        let nums = document.querySelector('.nums');
        nums.appendChild(number);
    }
}


function setNewBoard(){
    hintChan = 90;
    newboard = 1;
    document.querySelector('.hint').innerText = 'Hints - 3'
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let box = document.getElementById(`${i.toString()}-${j.toString()}`);
            // console.log(box);
            // console.log(" ");
            box.innerText = "";
            box.style.backgroundColor = null
            if(questions[i][j]!=0){
                box.innerText = questions[i][j].toString();
                let ran = box.innerText;
                // console.log(typeof(ran));
                box.style.backgroundColor = 'rgb(216, 218, 221)';
                box.classList.add  = 'static';
                // console.log(box.style.backgroundColor);
            }
        }
    }
    // console.log('new game');
}
function hint(){
    let f = 1;
    if(hintChan<=0){
            alert("out of hints")
            return;
    }
    while(f){
        let i ,j;
        i = Math.floor(Math.random()*9)
        j = Math.floor(Math.random()*9)
        // console.log(i+" "+j);
        let box = document.getElementById(`${i.toString()}-${j.toString()}`)
        // console.log(box);
        if(box.style.backgroundColor!='rgb(216, 218, 221)' 
            && box.innerText==""){
                box.innerText = solutions[i][j]
            f = 0;
            hintChan--;
            document.querySelector(".hint").innerHTML = "Hints "+hintChan;
        }
        
    }
}
// function loadGame(){
//     let fet = fetch('https://sudoku-api.vercel.app/api/dosuku')
//     fet
//     .then((resp)=>{
//         return resp.json();
//     })
//     .then((data)=>{
//         questions = data.newboard.grids[0].value;
//         solutions = data.newboard.grids[0].solution;
//         console.log(solutions);
//     })
//     .then(()=>{
//         setNewBoard();
//     })
//     .catch(()=>{
//         alert("Unable to load new game")
//     })
// }
function fetching(){
    let fet = fetch("https://sudoku-api.vercel.app/api/dosuku");
    fet
    .then((data)=>{
        return data.json();
    })
    .then((data)=>{
        questions = data.newboard.grids[0].value;
        solutions = data.newboard.grids[0].solution;
        console.log(solutions);
    })
    .then(()=>{
        setNewBoard();
    })
    .catch(()=>{
        alert("Unable to load new game")
    })
}
function reset (){
    let x = 0;
    hintChan = 3;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let box = document.getElementById(`${i.toString()}-${j.toString()}`);
            if(box.style.backgroundColor!='rgb(216, 218, 221)')
            box.innerText = "";
            x++;
        }
    }
}

function check(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let box = document.getElementsByClassName(`${i.toString()}-${j.toString()}`);
            let temp = box[0].innerText;
            if(temp == solutions[i][j].toString()){
                continue
            }
            else{
                alert("incorrect");
                return;
            }
            

        }
    }
    alert("corect")
}