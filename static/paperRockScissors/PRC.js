import Score from "/static/paperRockScissors/score.js";

const choices = ["rock", "paper", "scissors"];                  //Hold the values of Rock Paper Scissors

const resultDisplay = document.querySelector('#result');        //Value for the result (using the id)
const choicesDisplay = document.querySelector('#choices');      //Value for the choice (using the id)

const handleClick = (e) => {
    let userChoice = e.target.innerHTML;
    let computerChoice = choices[Math.floor(Math.random()*choices.length)];
    getResults(userChoice, computerChoice);                     //Pass through players choice and a randomly generated one.
}

choices.forEach(choice => {
    const button = document.createElement('button');            //Create a button
    button.innerHTML = choice;
    button.addEventListener('click', handleClick);
    choicesDisplay.appendChild(button);
});


const getResults = (userChoice, computerChoice) => {
    switch (userChoice + computerChoice) {
        case 'scissorspaper':
        case 'rockscissors':
        case 'paperrock':
            resultDisplay.innerHTML = "You chose " + userChoice + " and the computer chose " + computerChoice + ". You win!";
            return "win";
        case 'papersscissors':
        case 'scissorsrock':
        case 'rockpaper':
            resultDisplay.innerHTML = "You chose " + userChoice + " and the computer chose " + computerChoice + ". You lose.";
            return "lose";
        case 'scissorsscissors':
        case 'rockrock':
        case 'paperpaper':
            resultDisplay.innerHTML = "You chose " + userChoice + " and the computer chose " + computerChoice + ". You tie. That's sad.";
            return "tie";
    }
}



