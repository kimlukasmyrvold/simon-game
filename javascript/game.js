var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(document).keypress(() => {
    if (gameStarted === false) {
        gameStarted = true;
        nextSequence();
    }
})


$(document).click(() => {
    if (gameStarted === false) {
        gameStarted = true;
        nextSequence();
    }
})

$('.btn').click(function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        new Audio('./sounds/wrong.mp3').play();
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
    }
}

function nextSequence() {
    $('#level-title').text(`Level ${level}`);
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    userClickedPattern = [];

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function startOver() {
    gamePattern = [];
    gameStarted = false;
    level = 0;
}

function playSound(name) {
    new Audio(`./sounds/${name}.mp3`).play();
}

function animatePress(currentColor) {
    $(`.${currentColor}`).addClass('pressed');

    setTimeout(() => {
        $(`.${currentColor}`).removeClass('pressed');
    }, 100);
}
