const choices = ["rock", "paper", "scissors"];                  //Hold the values of Rock Paper Scissors

const resultDisplay = document.querySelector('#result');        //Value for the result (using the id)
const choicesDisplay = document.querySelector('#choices');      //Value for the choice (using the id)
const scoreDisplay = document.querySelector('#score');          //Value for the scores (using the id)

let win = 0;
let lose = 0;
let tie = 0;

const handleClick = (e) => {
    let userChoice = e.target.innerHTML;
    let computerChoice = choices[Math.floor(Math.random()*choices.length)];
    getResults(userChoice, computerChoice);                     //Pass through players choice and a randomly generated one
    scoreDisplay.innerHTML = "Wins: " + win + "<br>Loses: " + lose + "<br>Ties: " + tie;
}

choices.forEach(choice => {
    const button = document.createElement('button');            //Create a button
    button.innerHTML = choice;
    button.addEventListener('click', handleClick);
    choicesDisplay.appendChild(button);
});

const getResults = (userChoice, computerChoice) => {
    switch (userChoice[0] + computerChoice[0]) {
        case 'sp':
        case 'rs':
        case 'pr':
            resultDisplay.innerHTML = "Your Choice: " + userChoice + "<br>Computer's Choice: " + computerChoice + ". <br>You win!";
            win += 1;
            return "win";
        case 'ps':
        case 'sr':
        case 'rp':
            resultDisplay.innerHTML = "Your Choice: " + userChoice + "<br>Computer's Choice: " + computerChoice + ". <br>You lose.";
            lose += 1;
            return "lose";
        case 'ss':
        case 'rr':
        case 'pp':
            resultDisplay.innerHTML = "Your Choice: " + userChoice + "<br>Computer's Choice: " + computerChoice + ". <br>You tie. That's sad.";
            tie += 1;
            return "tie";
    }
};




