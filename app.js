//Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI ELEMENTS
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

//Assign UI min and Max
minNum.textContent = min;
maxNum.textContent = max;

//Play Again event Listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});
//Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    //wrong number//substract game life
    guessesLeft -= 1;
    //check if won
    if (guess === winningNum) {
      //Game Over - won
      gameOver(true, `${winningNum} is correct! YOU WIN`);
    } else {
      if (guessesLeft === 0) {
        //Game Over -lost
        gameOver(
          false,
          `Game Over, you lost. The correct number was ${winningNum}`
        );
      } else {
        guessInput.value = "";
        //game continues
        setMessage(
          ` ${guess} is not correct, ${guessesLeft} guesses left`,
          "red"
        );
      }
    }
  }
});

//GameOver
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  //disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set Message
  setMessage(msg, color);

  //play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

//Get Winning NUmber
function getRandomNum(mi, ma) {
  return Math.floor(Math.random() * (max - min + min));
}

//set Message
function setMessage(smg, color) {
  message.style.color = color;
  message.textContent = smg;
}
