/** CREATING THE ARRAY */
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

/** adding a keypress event to document */
$(document).keypress(function(){
        if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
        }
    });

/** ADDING CLICK EVENT TO THE BUTTON*/
$(".btn").on('click', function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);      
    playSound(userChosenColour);
    animatePress(userChosenColour);           
    checkAnswer(userClickedPattern.length-1);
});

/** CHECK ANSWER*/

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log('success');
      if (gamePattern.length === userClickedPattern.length){
        setTimeout(() =>{
          nextSequence();
        }, 1000)
    }
  }else{
    reset();
  }
  

  }
  

/** GENERATING RANDOM NUMBERS */
function nextSequence() {
    /** initializing users clicked pattern to an empty array whenever the function nextSequence() is called*/
    userClickedPattern = [];
     /** ADDING LEVEL*/
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    /** PUSHING INTO THE ARRAY */

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    /** ADDING THE FADE ANIMATION */

    $("#" + randomChosenColour).fadeIn(10).fadeOut(50).fadeIn(10);
    // setInterval(function () {
    //     $("#" + randomChosenColour).fadeIn();
    //     $("#" + randomChosenColour).fadeOut();
    // }, 100);

    /** UPDATING H1*/

    $("#level-title").text("level "+level);
    playSound(randomChosenColour);
  
}


/** ADDING AND REMOVING CLASS => PRESSED */
function animatePress(className) {
    $("#" + className).addClass("pressed");
    setTimeout(() => {
        $("#" + className).removeClass("pressed");
    }, 100);
}

/** PLAY SOUND */
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
/** RESET FUNCTION */
function reset(){
    playSound('wrong')
    gamePattern = [];
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(()=>{
        $("body").removeClass('game-over');
    },200);
    level = 0;
    started = false;
 
}