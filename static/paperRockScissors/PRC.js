//Create a list of our choices
const choices = ["ROCK", "PAPER", "SCISSORS"];                  //Hold the values of Rock Paper Scissors

//Display our items
const resultDisplay = document.querySelector('#result');        //Value for the result (using the id)
const choicesDisplay = document.querySelector('#choices');      //Value for the choice (using the id)
const scoreDisplay = document.querySelector('#score');          //Value for the scores (using the id)

//Create our variable to hold our score.
let win = 0;
let lose = 0;
let tie = 0;

//What do we do with our buttons?
const handleClick = (element) => {
    let playersChoice = element.target.innerHTML;                                           //Create a playersChoice variable
    let compChoice = choices[Math.floor(Math.random()*choices.length)];                     //Create a compChoice variable
    getResults(playersChoice, compChoice);                                                  //Pass through players choice and a randomly generated one
    scoreDisplay.innerHTML = "Wins: " + win + "<br>Loses: " + lose + "<br>Ties: " + tie;    //Display the scores
}

//Create our buttons!
choices.forEach(choice => {
    const button = document.createElement('button');            //Create a button
    button.innerHTML = choice;                                  //Label our button
    button.addEventListener('click', handleClick);              //Add an event listener to have the button do something
    choicesDisplay.appendChild(button);                         //Display what the button should be!
});

//Create a way to get our results from the inputs
const getResults = (playersChoice, compChoice) => {
    switch (playersChoice[0].toLowerCase() + compChoice[0].toLowerCase()) {
        case 'sp':
        case 'rs':
        case 'pr':
            resultDisplay.innerHTML = "Your Choice: " + playersChoice + "<br>Computer's Choice: " + compChoice + ". <br><br>YOU WIN!" + "<br><br>Play again?";
            win += 1;
            break;
        case 'ps':
        case 'sr':
        case 'rp':
            resultDisplay.innerHTML = "Your Choice: " + playersChoice + "<br>Computer's Choice: " + compChoice + ". <br><br>You lose." + "<br><br>Play again?";
            lose += 1;
            break;
        case 'ss':
        case 'rr':
        case 'pp':
            resultDisplay.innerHTML = "Your Choice: " + playersChoice + "<br>Computer's Choice: " + compChoice + ". <br><br>You tie." + "<br><br>Play again?";
            tie += 1;
            break;
    }
};




