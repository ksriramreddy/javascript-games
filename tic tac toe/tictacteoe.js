window.onload = function(){
    setGame();
}
let game = [
    [' ',' ',' '],
    [' ',' ',' '],
    [' ',' ',' ']
]
let over = 0;
let turn = 1;
function setGame(){
    document.querySelector('.board').innerHTML='';
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let box = document.createElement('div');
            box.classList.add(`${i.toString()}-${j.toString()}`);
            box.innerText = game[i][j];
            box.style.backgroundColor = 'black'
            box.addEventListener('click',()=>{
                if(over) return;
                if(box.innerText==''){
                    if(turn%2==0){
                        box.innerText = 'x';
                        game[i][j]='x';
                    }
                    else{
                        box.innerText = 'o';
                        game[i][j]='o';
                    }
                    turn++
                    
                }
                setTimeout(() => {
                    check()
                }, 100);
                
            })
            let board = document.querySelector('.board');
            board.appendChild(box);
        }   
    }
}

function check(){

    let a,b,c,d,e,f;
    if ((game[0][0]!=' ') && (game[0][0] == game[0][1] && game[0][0] == game[0][2])){
        a=0; b=0; c=0; d=1; e=0; f=2; over=1; 
    }
    else if ((game[0][0]!=' ') && (game[0][0] == game[1][1] && game[0][0] == game[2][2])){
        a=0; b=0; c=1; d=1; e=2; f=2; over=1; 
    }
    else if ((game[0][0]!=' ') && (game[0][0] == game[1][0] && game[0][0] == game[2][0])){
        a=0; b=0; c=1; d=0; e=2; f=0; over=1; 
    }
    else if ((game[0][1]!=' ') && (game[0][1] == game[1][1] && game[0][1] == game[2][1])){
        a=0; b=1; c=1; d=1; e=2; f=1; over=1; 
    }
    else if ((game[0][2]!=' ') && (game[0][2] == game[1][2] && game[0][2] == game[2][2])){
        a=0; b=2; c=1; d=2; e=2; f=2; over=1; 
    }
    else if ((game[0][2]!=' ') && (game[0][2] == game[1][1] && game[0][2] == game[2][0])){
        a=0; b=2; c=1; d=1; e=2; f=0; over=1; 
    }
    else if ((game[1][0]!=' ') && (game[1][0] == game[1][1] && game[1][0] == game[1][2])){
        a=1; b=0; c=1; d=1; e=1; f=2; over=1; 
    }
    else if ((game[2][0]!=' ') && (game[2][0] == game[2][1] && game[2][0] == game[2][2])){
        alert('20')
        a=2; b=0; c=2; d=1; e=2; f=2; over=1; 
    }
    if(over){
        (document.getElementsByClassName(`${a}-${b}`)[0].style.backgroundColor = 'green');
        (document.getElementsByClassName(`${c}-${d}`)[0].style.backgroundColor = 'green');
        (document.getElementsByClassName(`${e}-${f}`)[0].style.backgroundColor = 'green');
    }
}
function newGame(){
    game = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
    ];
    over = 0;
    turn = 1;
    setGame()
}