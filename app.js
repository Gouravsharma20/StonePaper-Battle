let userScore = 0;
let computerScore = 0;

// Load scores from localStorage on page load
if (localStorage.getItem("userScore")) {
  userScore = parseInt(localStorage.getItem("userScore"), 10);
}
if (localStorage.getItem("computerScore")) {
  computerScore = parseInt(localStorage.getItem("computerScore"), 10);
}

document.addEventListener("DOMContentLoaded", () => {
  // DOM elements (now safe to query)
  const nextbtn = document.getElementById("nextBtn");
  const userScoreElement = document.getElementById("user-score"); // lowercase id
  const computerScoreElement = document.getElementById("computer-score");

  const choices = document.querySelectorAll(".choice");
  // const message = document.querySelector("#message"); // unused - remove if not needed

  const rulesBtn = document.getElementById("rulesBtn");
  const rulesBox = document.getElementById("rulesBox");
  const closeBtn = document.getElementById("closeBtn");

  const triangleContainer = document.querySelector(".triangle-container");
  const resultContainer = document.getElementById("resultContainer");
  const userPicked = document.getElementById("user-picked");
  const pcPicked = document.getElementById("pc-picked");
  const resultText = document.getElementById("result-text");
  const playAgainBtn = document.getElementById("playAgainBtn");

  const header = document.querySelector(".header");
  const footerButtons = document.querySelector(".footer-buttons");

  // Update the display with stored scores
  userScoreElement.innerText = userScore;
  computerScoreElement.innerText = computerScore;

  let gameActive = true;

  const generateComputerChoice = () => {
    const arr = ["stone", "paper", "scissors"];
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const drawGame = (userchoice, computerChoice) => {
    triangleContainer.style.display = "none";
    resultContainer.style.display = "flex";

    userPicked.setAttribute("data-choice", userchoice);
    userPicked.innerHTML = `<img src="./images/${userchoice}Icon.png" alt="${userchoice}">`;

    pcPicked.setAttribute("data-choice", computerChoice);
    pcPicked.innerHTML = `<img src="./images/${computerChoice}Icon.png" alt="${computerChoice}">`;

    userPicked.classList.remove("winner");
    pcPicked.classList.remove("winner");

    resultText.innerText = "TIE UP";
    nextbtn.style.display = "none";
    footerButtons.classList.remove("next-visible");
    gameActive = false;
  };

  const winner = (userwin, userchoice, computerChoice) => {
    triangleContainer.style.display = "none";
    resultContainer.style.display = "flex";

    userPicked.setAttribute("data-choice", userchoice);
    userPicked.innerHTML = `<img src="./images/${userchoice}Icon.png" alt="${userchoice}">`;

    pcPicked.setAttribute("data-choice", computerChoice);
    pcPicked.innerHTML = `<img src="./images/${computerChoice}Icon.png" alt="${computerChoice}">`;

    userPicked.classList.remove("winner");
    pcPicked.classList.remove("winner");

    if (userwin) {
      userScore += 1;
      localStorage.setItem("userScore", userScore);
      resultText.innerText = "YOU WIN AGAINST PC";
      nextbtn.style.display = "inline-block";
      footerButtons.classList.add("next-visible");
      userPicked.classList.add("winner");
    } else {
      computerScore += 1;
      localStorage.setItem("computerScore", computerScore);
      nextbtn.style.display = "none";
      footerButtons.classList.remove("next-visible");
      resultText.innerText = "YOU LOST AGAINST PC";
      pcPicked.classList.add("winner");
    }

    userScoreElement.innerText = userScore;
    computerScoreElement.innerText = computerScore;
    gameActive = false;
  };

  const playGame = (userchoice) => {
    if (!gameActive) return;
    const computerChoice = generateComputerChoice();
    if (userchoice === computerChoice) {
      drawGame(userchoice, computerChoice);
    } else {
      let userwin = true;
      if (userchoice === "stone") {
        userwin = computerChoice === "paper" ? false : true;
      } else if (userchoice === "paper") {
        userwin = computerChoice === "scissors" ? false : true;
      } else {
        userwin = computerChoice === "stone" ? false : true;
      }
      winner(userwin, userchoice, computerChoice);
    }
    console.log("userchoice = ", userchoice);
  };

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const userchoice = choice.getAttribute("id");
      playGame(userchoice);
    });
  });

  playAgainBtn.addEventListener("click", () => {
    resultContainer.style.display = "none";
    triangleContainer.style.display = "block";
    nextbtn.style.display = "none";
    footerButtons.classList.remove("next-visible");
    gameActive = true;
  });

  nextbtn.addEventListener("click", () => {
    resultContainer.style.display = "none";
    document.getElementById("hurrayContainer").style.display = "flex";
    header.style.display = "none";
    document.querySelector(".footer-buttons").style.display = "flex";
    nextbtn.style.display = "none";
    footerButtons.classList.remove("next-visible");
  });

  rulesBtn.addEventListener("click", () => {
    rulesBox.style.display = rulesBox.style.display === "block" ? "none" : "block";
  });

  closeBtn.addEventListener("click", () => {
    rulesBox.style.display = "none";
  });

  document.getElementById("playAgainFromHurray").addEventListener("click", () => {
    document.getElementById("hurrayContainer").style.display = "none";
    triangleContainer.style.display = "block";
    header.style.display = "flex";
    document.querySelector(".footer-buttons").style.display = "flex";
    rulesBox.style.display = "none";
    footerButtons.classList.remove("next-visible");
    gameActive = true;
  });
});
