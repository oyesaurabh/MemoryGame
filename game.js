let colorArray=["red","yellow","green","blue"];
var gamePattern=[];
var userClickPattern=[];
var level=0, gameStarted=false;

//to do things when the first click has been pressed.
$(document).keypress(function(){
    if(gameStarted==false){
        $("#level-title").text("Level "+level);
        gameStarted=true;
        nextSequence();
    }
});

//animate + sound when user click buttons
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    //call checkAns to check answer
    checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("#level-title").text("Game Over, Your Score "+level);
        
        //to turn background red for a while
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

//UTILITY FUNCTIONs

function nextSequence(){
    userClickPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = colorArray[randomNumber];
    gamePattern.push(randomColor);   
    //1. Use jQuery to select the button with the same id as the randomColour
    //2. Using jQuery to animate a flash to the button selected.
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}
function playSound(name){
    //Javascript to play the sound for the button colour
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(colorName){
    $("#"+colorName).addClass("pressed");
    setTimeout(function(){
        $('#'+colorName).removeClass("pressed");
    },100);
}
function startOver(){
    level=0;
    gamePattern=[];
    gameStarted=false;
}
