//Set up the require connection to letter js
var letter = require('./letter.js')

//Set up word contstructor function with the word as a parameter
var Word = function(word) {
	this.word = word,
//create an empty array to hold the letter objects of the word
  this.letters = [];
// Array to hold the blanks and letters for game play.
  this.displayWord = []
//Function addLetters loops through the word and pushes each letter to the letters array
  this.addLetters = function(){
  	for(i=0; i<this.word.length; i++){
    	this.letters.push(new letter(this.word[i]));
    }
  }
//function to display the current guessed letters and blanks
  this.createLetterString = function() {
//reset the array
    this.displayWord.length = 0;
  	for(i=0; i<this.letters.length; i++){
    //grab the letter value for each object and push it to the displayWord array
    	this.displayWord.push(this.letters[i].returnLetter());
    }
		//join the array objects and display as a string
    console.log(this.displayWord.join(""));
  }
	//Function to test if the user has guessed a correct letter
  this.letterGuessCheck = function(userGuess){
	//run the letterGuess function on each letter in the word
  	for(i=0; i<this.letters.length; i++){
    	this.letters[i].letterGuess(userGuess);
    }
  }
}
module.exports = Word;
// var testWord = new Word("hello");
// testWord.addLetters();
// testWord.letterGuessCheck('h');
// testWord.createLetterString();
// testWord.letterGuessCheck('e');
// testWord.createLetterString();
// testWord.letterGuessCheck('i');
// testWord.createLetterString();
// testWord.letterGuessCheck('l');
// testWord.createLetterString();
