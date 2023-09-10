const targetWords = ["there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three", "plops"];
const dictionary = ["there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three","there", "their", "three", "plops"];

const guessGrid = document.querySelector("[data-guess-grid]");
const alertContainer = document.querySelector("[data-alert-container]");
const wordLength = 5;
const FLIP_ANIMATION_DURATION = 500;
const DANCE_ANIMATION_DURATION = 500;
const keyboard = document.querySelector("[data-keyboard]");
const offsetFromDate = new Date(2023, 0, 1);
const msOffset = Date.now() - offsetFromDate;
const dayOffset = msOffset/1000/60/60/24;
//const targetWord = targetWords[Math.floor(dayOffset)];
const targetWord = targetWords[7];


startInteraction();

function startInteraction() {
    document.addEventListener("click", handleMouseClick);
    document.addEventListener("keydown", handleKeyPress);
}

function stopInteraction() {
    document.removeEventListener("click", handleMouseClick);
    document.removeEventListener("keydown", handleKeyPress);
}

function handleMouseClick(e) {
    if (e.target.matches("[data-key]")){
        pressKey(e.target.dataset.key);
        return;
    }
    if (e.target.matches("[data-enter]")){
        submitGuess();
        return;
    }
    if (e.target.matches("[data-delete]")){
        deleteKey();
        return;
    }
}

function handleKeyPress(e){
    if (e.key === "Enter"){
        submitGuess();
        return;
    }
    if (e.key === "Backspace" || e.key === "Delete"){
        deleteKey();
        return;
    }
    if (e.key.match(/^[a-zA-Z]$/)) {
        pressKey(e.key);
        return;
    }
}

function pressKey(key) {
    const activeTiles = getActiveTiles();
    if (activeTiles.length >= wordLength){
        return;
    }
    const nextTile = guessGrid.querySelector(":not([data-letter])");
    nextTile.dataset.letter = key.toLowerCase();
    nextTile.textContent = key;
    nextTile.dataset.state = "active";
}

function deleteKey(){
    const activeTiles = getActiveTiles();
    const tileLength = activeTiles.length;
    const lastTile = activeTiles[tileLength - 1];
    if (lastTile == null) {
        return;
    }
    lastTile.textContent = "";
    delete lastTile.dataset.state;
    delete lastTile.dataset.letter;
}

function submitGuess(){
    const activeTiles = [...getActiveTiles()]
    if (activeTiles.length !== wordLength){
        showAlert("Not Enough Letters Chosen!");
        shakeTiles(activeTiles);
        return;
    }

    const guess = activeTiles.reduce((word, tile) => {
        return word + tile.dataset.letter;
    }, "")

    if (!dictionary.includes(guess)){
        showAlert("Not in our dictionary, sorry!");
        shakeTiles(activeTiles);
        return;
    }

    stopInteraction();
    activeTiles.forEach((...params) => flipTile(...params, guess))
}

function flipTile(tile, index, array, guess){
    const letter = tile.dataset.letter;
    const key = keyboard.querySelector(`[data-key="${letter}"i]`);
    setTimeout(() => {
        tile.classList.add("flip");
    }, index*FLIP_ANIMATION_DURATION/2)

    tile.addEventListener("transitionend", () =>{
        tile.classList.remove("flip");
        if (targetWord[index] === letter){
            tile.dataset.state = "correct";
            key.classList.add("correct");
        }
        else if (targetWord.includes(letter)){
            tile.dataset.state = "incorrect_placement"
            key.classList.add("incorrect_placement")
        }
        else {
            tile.dataset.state = "incorrect";
            key.classList.add("incorrect");
        } 
        
        if (index == array.length-1){
            tile.addEventListener("transitionend", () => {
                startInteraction();
                checkWinLose(guess, array)
            }, {once:true})
        }
    }, {once:true})
}

function getActiveTiles(){
    return guessGrid.querySelectorAll('[data-state = "active"]');
}

function showAlert(message, duration = 1000){
    const alert = document.createElement("div");
    alert.textContent = message;
    alert.classList.add("alert");
    alertContainer.prepend(alert);
    if (duration == null){
        return;
    }
    setTimeout(() => {
        alert.classList.add("hide")
        alert.addEventListener("transitionend", () => {
            alert.remove()
        })
    }, duration)
}

function shakeTiles(tiles){
    tiles.forEach(tile => {
        tile.classList.add("shake");
        tile.addEventListener("animationend", () => {
            tile.classList.remove("shake")
        }, {once : true})
    })
}

function checkWinLose(guess, tiles){
    if (guess == targetWord){
        showAlert("You Guessed it!  You WON!", 5000);
        danceTiles(tiles);
        stopInteraction();
        return;
    }

    const remainingTiles = guessGrid.querySelectorAll(":not([data-letter");
    if (remainingTiles.length === 0){
        showAlert("You Lose! The correct word was " + targetWord.toUpperCase(), null);
        stopInteraction();
    }
}

function danceTiles(tiles){
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("dance");
            tile.addEventListener(
            "animationend", 
            () => {
                tile.classList.remove("dance")
            }, 
            {once : true}
            )
        }, index*DANCE_ANIMATION_DURATION/7)
    })
}