//Set up requires (word.js and the inquirer funciton)
var Word = require('./words.js')
var inquire = require('inquirer')

//Set up initial variables
var availableLetters = "ABDCEFGHIJKLMNOPQRSTUVWXYZ"
var guessedLetters = [];
var wrongLetters = [];
var guessesLeft = 5;
var currentWord = '';
// var userGuess = process.argv[2].toUpperCase();

var wordsToGuess = ['Ludwig van Beethoven', 'Johan Sebastian Bach',
  'Wolfgang Amadeus Mozart', 'Frederic Chopin', 'Johannes Brahms', 'Joseph Haydn', 'Richard Wagner', 'George Frederic Handel'
]

//Function to select a word
function chooseWord() {
  randomNumber = Math.floor(Math.random() * wordsToGuess.length);
  currentWord = new Word(wordsToGuess[randomNumber].toUpperCase());

}

//Function run if the user wins or loses, asking if they want to play again
function playAgain() {
  inquire.prompt([{
    type: "confirm",
    name: "playAgain",
    message: "Play Again?"
  }]).then(function(result) {
  //if the player selects yes, reset the variables, choose a new word, and display its blanks
    if (result.playAgain) {
      chooseWord();
      guessesLeft = 5;
      guessedLetters = [];
      wrongLetters = [];
      currentWord.addLetters();
      currentWord.createLetterString();
      playGame();
    } else {
      return;
    }
  })
};

//function to play game
function playGame() {
  //If there are no blanks left, the user has won
  if (currentWord.displayWord.indexOf('_') === -1) {
    console.log("You Win!");
    playAgain();
  } else {
    inquire.prompt([{
      name: "guess",
      message: "Select a letter: "
    }]).then(function(result) {
      //Check to make sure the user still has guesses left
      if (guessesLeft > 0) {
        //create variable to hold the user guess, set to to upper to upper case
        var userGuess = result.guess.toUpperCase()
        //check to see if the letter has been guessed
        if (guessedLetters.includes(userGuess)) {
          console.log("You already guessed that letter!");
          playGame();
        } else {
          //check to see if it is a usable letter & only one letter was input
          if (availableLetters.includes(userGuess) && result.guess.length === 1) {
            //push the letter to the guessed letters
            guessedLetters.push(userGuess);
            //Check to see the user guessed correctly
            if (currentWord.word.indexOf(userGuess) > -1) {
              console.log("Correct!");
            } else {
              console.log("Wrong! Guess again!");
              guessesLeft--;
            }
            //Display the updated letters and blanks
            currentWord.letterGuessCheck(userGuess);
            currentWord.createLetterString();
            //Run play game function again
            playGame()
          } else {
          //If the letter is not usable, display error
            console.log("Please enter a usable letter!");
            playGame();
          }
        }
      } else {
      //if the player is out of guesses, display "you lose" and give them the option
      //to play again
        console.log("You lose!");
        playAgain();
      }
    })
  }
}
//welcome dialog
console.log(" ___|______/|________________________________|_______________________")
console.log("|___|_____/_|________NODE TO JOY_____________|_____|==|______________|")
console.log("|__()____|__|______A Hangman Game of________()_____|__|______________|");
console.log("|________|_()_____Classical Composers_____________()_()______________|");
console.log("|_______()___________________________________________________________|");
console.log("");

chooseWord();
currentWord.addLetters();
//Display the blanks for the current word
currentWord.createLetterString();
playGame();
