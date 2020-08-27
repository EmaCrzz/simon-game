// game variables
let turn = 1;
let flash = 0;
let order = [];
let playerOrder = [];
let intervalId = null;
let run = false;
let compTurn;

// HTML elements
const $container = document.getElementById("container");
const $buttonStart = document.getElementById("button-start");
const $buttonRetry = document.getElementById("button-retry");
const $buttonGreen = document.getElementById("green");
const $buttonRed = document.getElementById("red");
const $buttonBlue = document.getElementById("blue");
const $buttonYellow = document.getElementById("yellow");
const $actionText = document.getElementById("action-text");

// Logic Game
const play = () => {
  run = true;
  addOrder();
  manageClicks();
  compTurn = true;
  intervalId = setInterval(gameTurn, 600);
};

const addOrder = () => {
  order.push(Math.floor(Math.random() * 4) + 1);
};

const gameTurn = () => {
  if (flash === turn) {
    manageClicks();
    clearColor();
    actionColor();
    clearInterval(intervalId);
    compTurn = false;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) $buttonGreen.classList.add("green_active");
      if (order[flash] == 2) $buttonRed.classList.add("red_active");
      if (order[flash] == 3) $buttonBlue.classList.add("blue_active");
      if (order[flash] == 4) $buttonYellow.classList.add("yellow_active");
      flash++;
    }, 200);
  }
};

const check = () => {
  const index = playerOrder.length - 1;
  compTurn = index + 1 === turn;
  if (order[index] === playerOrder[index]) {
    if (!compTurn) {
      return;
    }
    addOrder();
    turn++;
    flash = 0;
    playerOrder = [];
    $actionText.innerHTML = turn;
    listenColor();
    manageClicks();
    intervalId = setInterval(gameTurn, 800);
  } else {
    $buttonRetry.classList.remove("u-is-hidden");
    $buttonStart.classList.add("bg-error");
    $actionText.classList.remove("u-text-xlarge");
    $actionText.classList.add("u-text-medium");
    $actionText.innerHTML = "GAME OVER!";
    run = false;
  }
};

const manageClicks = () => {
  $buttonStart.classList.toggle("u-avoid-clicks");
  $buttonGreen.classList.toggle("u-avoid-clicks");
  $buttonRed.classList.toggle("u-avoid-clicks");
  $buttonBlue.classList.toggle("u-avoid-clicks");
  $buttonYellow.classList.toggle("u-avoid-clicks");
};

// Color functions
const clearColor = () => {
  $buttonGreen.classList.remove("green_active");
  $buttonRed.classList.remove("red_active");
  $buttonBlue.classList.remove("blue_active");
  $buttonYellow.classList.remove("yellow_active");
};

const actionColor = () => {
  $buttonStart.classList.remove("bg-listen");
  $buttonStart.classList.add("bg-action");
};

const retryGame = () => {
  turn = 1;
  flash = 0;
  order = [];
  playerOrder = [];
  listenColor();
  $actionText.innerHTML = "START";
  $buttonRetry.classList.add("u-is-hidden");
  $actionText.classList.remove("u-text-medium");
};

const listenColor = () => {
  $buttonStart.classList.remove("bg-error");
  $buttonStart.classList.remove("bg-action");
  $buttonStart.classList.add("bg-listen");
};

const errorColor = () => {
  $buttonStart.classList.remove("bg-action");
  $buttonStart.classList.remove("bg-listen");
  $buttonStart.classList.add("bg-error");
};

// Listener
$container.addEventListener("click", e => {
  // In addition to controlling that there is a dataset value, you also have to take
  // into account if it is the computer's turn and if the game is running
  const value = e.target.dataset["value"];
  console.log(value);
  if (value === "retry") {
    retryGame();
    return;
  }
  if (value === "start" && !run) {
    $actionText.classList.add("u-text-xlarge");
    $actionText.innerHTML = turn;
    play();
    return;
  }
  if (value) {
    playerOrder.push(parseInt(value));
    check();
  }
});
