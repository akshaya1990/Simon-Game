/*
Notes:
1. Logic to select a random color, flash the corresponding button and play the corresponding sound

a. Store the different colors in an array --> buttonColors
b. Generate a random number between 1-4 as we have four different colors to present to the user(red, green, blue, yellow) thats stored in buttonColors array.
c. Store the random color generated in another array called gamePattern so that this can be used to compare against whatever the user is selecting. Make sure to clear/empty this array when the game ends
d. In order to flash the buttonColors, we can use the id of the button which are basically the random colors generated in the previous step and animate using jquery fadeIn and fadeOut methods.
e. To play the sound, pass the random color generated and pass it to the function that is responsible for playing the audio. (playSound function)


2. Logic to capture the button clicked by the user, flash the button, play the corresponding audio file and check the user answer against the game pattern once the user clicks on a button

a. Add the click event to the elements with .btn class and inside the anonymous function,  do the following:
 --> Capture the id of the button clicked by the user and add it to an array that captures/stores the user selected pattern. 
 --> To play the sound, pass the button id captured to the function that is responsible for playing the audio. (playSound fuction)
 --> In order to flash the button, we can use the id of the button selected by the user and pass it to the function responsible for animating using jquery fadeIn, fadeOut methods.
 --> In order to validate the user selected button, pass the last button clicked by the user to the checkAnswer function.
 --> In order to check the user answer against the game pattern, pass the user answer to the function that is responsible for validating the user answer. (Note: )
 
3. Logic for validating the user answer
--> once the length is paased to the checkAnswer function, if the user selected button and the game pattern button is the same and if length of the game pattern is equal to the length of the user pattern array then it is a success and the game can continue generating the next sequence.
--> If the user selected button and the game pattern button does not match or if the length of the userpattern and game pattern is not equal then the game ends there and we will have update the heading, play the corresponding audio , animation using css and then restart the game.

4. Pressing any key and starting the game
--> Add the keydown event to the entire document so that when the user clicks on any key, the anonymous function starts the game by updating the heading with level 1
*/

var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
    userClickedPattern = []; // keep emptying this for every sequence
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
  
    $("#" + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
  }

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function startOver() {
  gamePattern = [];
  started = false;
  level = 0;

}
