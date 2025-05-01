let playBoard=document.querySelector(".play-board")
let scoreEle=document.querySelector(".score")
let highScorele=document.querySelector(".high-score")
let image=document.querySelector(".image")
let controls=document.querySelectorAll(".controls i")
let gameOver=false;
let score=0
let foodX,foodY, velocityX=0, velocityY=0
let snakeBody=[]
let snakeX=7,snakeY=10
let setIntervalId;
// let highScore=localStorage.getItem("high-score")||0
let highScore = localStorage.getItem("high-score") || 0;
highScorele.innerHTML = `<p>High Score: ${highScore}</p>`; // Display high score initially

const changeFoodPosition=()=>{
    foodX=Math.floor(Math.random()*31)
    foodY=Math.floor(Math.random()*31)
}
const handleGameOver=()=>{
    clearInterval(setIntervalId)
    playBoard.innerHTML += `<img src="./lost.gif" class="game-over-image">
    <button class="reload-btn" onclick="location.reload()">Play Again</button>`;


}
const changeDirecton=(e)=>{
    if (e.key === "ArrowUp" && velocityY === 0) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY === 0) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX === 0) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX === 0) {
        velocityX = 1;
        velocityY = 0;
    }   
}
controls.forEach(key=>{
    key.addEventListener("click",()=>changeDirecton({key:key.dataset.key}))
})
const initGame=()=>{
    if(gameOver) return handleGameOver()
    SnakeAndFood=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`
    if(snakeX===foodX && snakeY===foodY){
        changeFoodPosition()
        score++
        highScore=score>=highScore?score:highScore
        localStorage.setItem("high-score", highScore);
        scoreEle.innerHTML=`<p>Score:${score}</p>`
        snakeBody.push([foodX,foodY])
        // highScorele.innerHTML=`<p>High Score:${highScore}</p>`
        
    }
for (let i=snakeBody.length-1;i>0;i--){
    snakeBody[i]=snakeBody[i-1]
}
snakeBody[0]=[snakeX,snakeY]
    snakeX+=velocityX
    snakeY+=velocityY
    if(snakeX <=0 || snakeX>30 || snakeY<=0 || snakeY>30){
       gameOver=true;
    }

    for(let i=0; i<snakeBody.length;i++){
    SnakeAndFood+=`<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`
    if(i!==0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0]){
        gameOver=true
    }
    }
    playBoard.innerHTML=SnakeAndFood
}
changeFoodPosition()
//setInterval(function, milliseconds);
setIntervalId=setInterval(initGame, 120);
document.addEventListener("keydown",changeDirecton)