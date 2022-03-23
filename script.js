// stage 1: selecting between (rock, paper, or scissors)
let gameArea = document.querySelector(".game-area");
let options = Array.from(document.querySelectorAll("[data-value]"));
let triangleContainer = document.querySelector(".triangle-container");
let pickingStage = document.querySelector(".picking-stage");
let pickingStageInitial = pickingStage.cloneNode(true);
let scoreElement = document.querySelector(".score-point");
let score = 0;
scoreElement.innerText = "" + score;

let overlay = document.querySelector(".overlay");
let modalContainer = document.querySelector(".modal-container");
let rulesButton = document.querySelector(".rules-button");
rulesButton.addEventListener("click", displayRules);

options.forEach((option) => {
  option.addEventListener("click", () => {
    let optionValue = option.dataset.value;

    triangleContainer.classList.toggle("hidden");
    pickingStage.classList.toggle("hidden");
    gameArea.classList.add("margin-top");

    displaySecondStep(option, option.classList);
  });
});

function displaySecondStep(choice, classList) {
  let userPick = document.querySelector(".user-pick");
  userPick.innerHTML = choice.innerHTML;

  classList.forEach((classItem) => {
    userPick.classList.add(classItem);
  });

  setTimeout(() => {
    displayHousePick(choice.dataset.value);
  }, 1000);
}

function displayHousePick(userChoice) {
  let housePickElement = document.querySelector(".house-picked");
  let pickSlot = housePickElement.querySelector(".pick-slot");
  let randomPick = options[getRandomInt(3)];
  let housePick = document.createElement("div");

  housePick.innerHTML = randomPick.innerHTML;
  randomPick.classList.forEach((classItem) => {
    housePick.classList.add(classItem);
  });

  housePick.classList.add("house-pick");
  housePickElement.removeChild(pickSlot);
  housePickElement.appendChild(housePick);

  setTimeout(() => {
    displayResult(userChoice, randomPick.dataset.value);
  }, 1000);
}

function displayResult(userChoice, houseChoice) {
  let pickingStageChildren = Array.from(pickingStage.children);
  let resultOptions = ["TIE", "YOU LOSE", "YOU WIN"];
  let result = pickingStageChildren[1];
  let message = "";
  result.classList.remove("hidden");

  if (userChoice === "rock") {
    if (houseChoice === "rock") {
      message = resultOptions[0];
    } else if (houseChoice === "paper") {
      message = resultOptions[1];
    } else {
      message = resultOptions[2];
      score++;
      scoreElement.innerHTML = score;
    }
  }
  if (userChoice === "paper") {
    if (houseChoice === "paper") {
      message = resultOptions[0];
    } else if (houseChoice === "scissors") {
      message = resultOptions[1];
    } else {
      message = resultOptions[2];
      score++;
      scoreElement.innerHTML = score;
    }
  }
  if (userChoice === "scissors") {
    if (houseChoice === "scissors") {
      message = resultOptions[0];
    } else if (houseChoice === "rock") {
      message = resultOptions[1];
    } else {
      message = resultOptions[2];
      score++;
      scoreElement.innerHTML = score;
    }
  }

  result.firstElementChild.innerText = message;

  let playagain = result.querySelector(".play-again");
  playagain.addEventListener("click", resetGame);
}

function resetGame() {
  pickingStage.classList.toggle("hidden");
  gameArea.classList.remove("margin-top");
  triangleContainer.classList.toggle("hidden");
  pickingStage.innerHTML = pickingStageInitial.innerHTML;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function displayRules() {
  overlay.classList.remove("hidden");
  modalContainer.classList.remove("hidden");
}

let closeBtn = modalContainer.querySelector(".close-btn");
closeBtn.addEventListener("click", closeRules);

function closeRules() {
  overlay.classList.add("hidden");
  modalContainer.classList.add("hidden");
}
