let hangman=document.querySelector(".hangman")
let snake=document.querySelector(".snake")
// hangman.className ="h style"
hangman.innerHTML=`<img src="./hangman.jpg" alt="hangman" >`
hangman.addEventListener("click",function(){
    window.location.href = "../hangman/project.html";
})

snake.innerHTML=`<img src="./images.jpeg" alt="snake">`
snake.addEventListener("click",function(){
    window.location.href = "../snake/snake.html";
})

let hangman2=document.querySelector(".hangman2")
let FlappyBird=document.querySelector(".FlappyBird")
// hangman1.className ="h style"
// hangman2.innerHTML=`<img src="./hangman.jpg" alt="hangman" >`

FlappyBird.innerHTML=`<img src="./FlappyBird1.jpeg" alt="FlappyBird">`
FlappyBird.addEventListener("click",function(){
    window.location.href = "../flappybird/index.html";
})

