let keyboard=document.querySelector(".keyboard")
let hangmanImage=document.querySelector(".hangman-box img")
let wordDisplay=document.querySelector(".word-display")
let guessesText=document.querySelector(".incorrect b")
let hintText=document.querySelector(".hint-text")
let gameModal=document.querySelector(".game-modal")
let playAgain=document.querySelector(".play-again")
let currentWord,currentLetter=[],wrongGuessCount=0;
const maxGuesses=6
let resetGame=()=>{
    currentLetter=[];
    wrongGuessCount=0;
    hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`;
    // keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false)
    keyboard.querySelectorAll("button").forEach(btn=>btn.disabled=false)
    // keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false)
    wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    
}
async function words(){
    let options = {
        method: "GET", 
        headers: { "Content-Type": "application/json" }
    };
    try{
    let response=await fetch("https://exciting-hexagonal-elbow.glitch.me/wordlist",options)
    if(!response.ok){
        throw new Error("HTTP request failed"); 
    }
    let data=await response.json()
    getRandomWord(data)
    
    }
    catch(error){
        console.log("Error",error.message)
    }
}
words()


const getRandomWord = (data)=>{
 // wordlist = data;
    const { word, hint } = data[Math.floor(Math.random() * data.length)];
    console.log(word,hint)
    currentWord=word
    // console.log(currentWord)
    let hint1=document.querySelector(".hint-text b")
    hint1.innerText=hint
    resetGame()
    // hintText.appendChild(hint1)
    wordDisplay.innerHTML=word.split("").map(()=>`<li class="letter"></li>`).join("");
    
}
let gameOver=(isVictory)=>{
    setTimeout(()=>{
        const modalText=isVictory?`You found the word:`:`The correct word was:`
        gameModal.querySelector("img").src=`images/${isVictory ? 'victory':'lost'}.gif`
        gameModal.querySelector("h4").innerText=`${isVictory ? 'Congrats!':'GameOver'}`
        gameModal.querySelector("p").innerHTML=`${modalText}<b>${currentWord}</b>`

        gameModal.classList.add("show")
    },300)
}
const initGame = (button, clickedLetter) => {
    console.log(button, clickedLetter);
    
    if (!currentWord) {
        console.error("currentWord is not defined");
        return;
    }

    clickedLetter = clickedLetter.toLowerCase();  // Ensure case consistency

    // console.log("Checking:", clickedLetter, "in", currentWord.toLowerCase());

    if (currentWord.includes(clickedLetter)) {
        console.log(clickedLetter, "exists in the word:", currentWord);
        
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                currentLetter.push(letter)
                let listItem = wordDisplay.querySelectorAll("li")[index];
    
                if (listItem) {
                    listItem.innerText = currentWord[index]; // Keep original case
                    listItem.classList.add("guessed");
                }
            }
        });

    } else {
        // console.log(clickedLetter, "does not exist in the word");
        wrongGuessCount++
      
        hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`

    }
    button.disabled=true
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`;
    if(wrongGuessCount===maxGuesses){
        return gameOver(false)
    }
    if(currentLetter.length===currentWord.length){
        return gameOver(true)
    }
};
for(let i=97; i<=122;i++){
    // console.log(String.fromCharCode(i))
    let button=document.createElement("button")
    button.innerText=`${String.fromCharCode(i)}`
    keyboard.appendChild(button)
    button.addEventListener("click",e=>initGame(e.target,String.fromCharCode(i)))
}

// playAgain.addEventListener("click",getRandomWord)
playAgain.addEventListener("click", getRandomWord)
playAgain.addEventListener("click", () => {
    gameModal.classList.remove("show"); // Hide the game modal
    words(); // Fetch a new word and reset the game
});

