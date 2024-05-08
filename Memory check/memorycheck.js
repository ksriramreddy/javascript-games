
let imageList = ["naruto","sasuke","minato","kakashi","itachi",
                 "madara","hashirama","jiraiya","mightguy","obito"];
let board = [];
let selectedCard1 = null
let selectedCard2 = null
let total = 0;
window.onload = function(){
    setGame();
}

function setGame(){
    let cardSet = imageList.concat(imageList)
    // console.log(cardSet);
    for(let i=0;i<20;i++){
        let x = Math.floor(Math.random()*5);
        let temp = cardSet[x];
        cardSet[x] = cardSet[i];
        cardSet[i] = temp;
    }
    for(i=0;i<5;i++){
        let row = [];
        for(j=0;j<4;j++){
            let box = document.createElement('img');
            box.id = `${i.toString()}-${j.toString()}`;
            box.classList.add('box');
            box.addEventListener('click',selectCard)
            let ele = cardSet.pop();
            row.push(ele);
            // console.log(ele);
            box.src=`mcimgs/${ele}.jpg`
            let board = document.querySelector('.board');
            board.append(box);
        }
        board.push(row);
    }
    console.log(board);
    // console.log(board);
    setTimeout(() => {
        openCard()
    }, 1000);
}
function openCard(){
    for(let i=0;i<5;i++){
        for(let j=0;j<4;j++){
            document.getElementById(`${i.toString()}-${j.toString()}`).src="mcimgs/open.jpg";
        }
    }
}
function selectCard(){
    if(this.src.includes("open")){
        if(!selectedCard1){
            selectedCard1 = this;
            let cords = this.id.split('-');
            let r = parseInt(cords[0])
            let c = parseInt(cords[1])
            console.log(r , c);
            this.src = `mcimgs/${board[r][c]}.jpg`
        }
        else if(!selectedCard2 && this!=selectedCard1){
            selectedCard2 = this;
            let cords = this.id.split('-');
            let r = parseInt(cords[0])
            let c = parseInt(cords[1])
            console.log(r , c);
            this.src = `mcimgs/${board[r][c]}.jpg`
            setTimeout(() => {
                updateImg()
            }, 1000);
        }
    }
}
function updateImg(){
    if(selectedCard1.src!=selectedCard2.src){
        selectedCard1.src =`mcimgs/open.jpg`
        selectedCard2.src =`mcimgs/open.jpg`
    }
    else{
        total++;
        if(total == 10){
            displayBlock()
        }
    }
    selectedCard1 = null;
    selectedCard2 = null;
}
function displayBlock() {
    document.querySelector('.popup').style.display = 'inline'
}