
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(startGame);
$(document).click(startGame);

function startGame() {
    if (!started) {
        $("#level-title").text("Level: " + level);
        nextSequence();
        started = true;
    }
}



function nextSequence() {
userClickedPattern = [];
level++
$("#level-title").text("Level: "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    $("#"+userChosenColor).addClass("pressed");
    setTimeout(() => {
        $("#"+userChosenColor).removeClass("pressed");
    }, 100);

    userClickedPattern.push(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
    
    playSound(userChosenColor);
})

function playSound(name) {
    var audio = new Audio("./sounds/"+name+ ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
       startOver();
    }
}

function startOver() {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, press any key or click to Restart");

    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);

    setTimeout(() => {
        gamePattern = [];
        level = 0;
        started = false;
    }, 1000); // Delay the reset of the game states
}
