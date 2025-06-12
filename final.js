let selectedSign = "";

const xBtn = document.querySelector("#xBtn");
const oBtn = document.querySelector("#oBtn");
const startBtn = document.querySelector("#startBtn");
if (xBtn && oBtn && startBtn) {
xBtn.addEventListener("click", () => {
  selectedSign = "X";
  xBtn.classList.add("selected");
  oBtn.classList.remove("selected");
});

oBtn.addEventListener("click", () => {
  selectedSign = "O";
  oBtn.classList.add("selected");
  xBtn.classList.remove("selected");
});

startBtn.addEventListener("click", () => {
  if (selectedSign === "") {
    alert("Please select a sign first!");
  } else {
    localStorage.setItem("selectedSign", selectedSign);
    window.location.href = "final.html"; 
  }
});
}








let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let Sign = localStorage.getItem("selectedSign");
let turnO = Sign === "O"; // If player selected "O", O starts

let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = Sign === "O";
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      box.style.color = "#b0413e";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.style.color = "#390099";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return true;
      }
    }
  }
};


resetBtn.addEventListener("click", resetGame);
if (newBtn) {
  newBtn.addEventListener("click", () => {
    window.location.href = "front.html";
  });
}