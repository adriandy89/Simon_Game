var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

document.addEventListener('keypress', (e) => {
  if (!started) {
    document.getElementById("level-title").textContent = `Level ${level}`
    nextSequence();
    started = true;
  }
})

let btnClass = document.getElementsByClassName('btn')
for (const element of btnClass) {
  element.addEventListener('click', () => {
    var userChosenColour = element.id;
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);  
    checkAnswer(userClickedPattern.length-1);
  })
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      document.body.classList.add('game-over')
      document.getElementById('level-title').textContent = "Game Over, Press Any Key to Restart"

      setTimeout(function () {
        document.body.classList.remove('game-over')
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = `Level ${level}`
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  let chosenC = document.getElementById(randomChosenColour)
  fadeIn(chosenC, "inline-block");
  fadeOut(chosenC);
  fadeIn(chosenC, "inline-block");
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  document.getElementById(currentColor).classList.add('pressed')
  setTimeout(function () {
    document.getElementById(currentColor).classList.remove('pressed')
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// ** FADE OUT FUNCTION **
function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
      if ((el.style.opacity -= .05) < 0) {
          el.style.display = "none";
      } else {
          requestAnimationFrame(fade);
      }
  })();
};

// ** FADE IN FUNCTION **
function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "inline-block";
  (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .05) >= 1)) {
          el.style.opacity = val;
          requestAnimationFrame(fade);
      }
  })();
};