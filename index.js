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
//function to play game
function playGame() {
  inquire.prompt([{
    name: "guess",
    message: "Select a letter: "
  }]).then(function(result) {
      if(guessesLeft > 0){
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
            //if the letter appears in the word
            if (currentWord.letters.inlcudes(userGuess)){
              console.log("Correct!");
              currentWord.letterGuessCheck(userGuess);
              currentWord.createLetterString();
            } else {
              guessesLeft--;
            }
            playGame()
          } else {
            console.log("Please enter a usable letter!");
            playGame();
          }
        }
      } else {
        console.log("You lose!");
      }
  })
}
//welcome dialog
console.log("-------------------------------------------------------------------")
console.log("Node to Joy: A Hangman Game of Classical Composers");
chooseWord();
currentWord.addLetters();
playGame();
