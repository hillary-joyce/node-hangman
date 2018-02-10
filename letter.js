//Set up letter constructor function
var Letter = function(letter){
//parameters hold the letter information and whether it's been correctly guessed
	this.letter = letter,
  this.guessed = false,
 //function to change appearance of letter from _ to letter when guessed correctly by the user
  this.returnLetter = function() {
  	if(this.letter === ' '){
      return ' ';
    }else if (this.guessed === false){
    	return '_';
    } else {
    	return this.letter;
    }
  };
  this.letterGuess = function(userGuess){
  	if (userGuess === this.letter){
    	this.guessed = true;
    }
  }
}

//Add module exports to allow other files (words.js) to access constructor
module.exports = Letter;

// var newLetter = new Letter('a');
// newLetter.returnLetter();
// console.log(newLetter.guessed);
// newLetter.letterGuess('m');
// console.log(newLetter.guessed);
// newLetter.letterGuess('a');
// console.log(newLetter.guessed);
// newLetter.returnLetter();
