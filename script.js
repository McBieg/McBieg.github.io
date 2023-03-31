const board = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
	[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

let currentPlayer = "X";
let gameType = "single";
let gameActive = true;
let singlePlayerScore = 0;
let multiPlayerScore = { X: 0, O: 0 };

const cells = document.querySelectorAll("td");
const message = document.getElementById("message");
const newGameBtn = document.getElementById("new-game-btn");
const singlePlayerBtn = document.getElementById("single-player-btn");
const multiPlayerBtn = document.getElementById("multi-player-btn");

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute("id");

    if (board[clickedCellIndex] !== "" || !gameActive) {
		return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add("highlight");

    checkForWin();

    if (gameActive && gameType === "single") {
        computerPlayerTurn();
    }
}

function computerPlayerTurn() {
  const emptyCells = [];

  for (let i = 0; i < board.length; i++) {
	if (board[i] === "") {
      emptyCells.push(i);
    }
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const computerChoice = emptyCells[randomIndex];

  board[computerChoice] = "O";
  const cell = document.getElementById(computerChoice);
  cell.textContent = "O";
  cell.classList.add("highlight");

  checkForWin();
}

function checkForWin() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      endGame(true, currentPlayer);
      return;
    }
  }

  if (board.includes("")) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  } else {
    endGame(false);
  }

  updateMessage();
}

function endGame(hasWinner, winner = null) {
  gameActive = false;

  if (hasWinner) {
    if (gameType === "single") {
      winner === "X" ? singlePlayerScore++ : (multiPlayerScore.O++);
    } else {
      multiPlayerScore[winner]++;
    }
  }

  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("highlight");
  }

  updateMessage(hasWinner, winner);
}

function updateMessage(hasWinner = false, winner = null) {
  if (hasWinner) {
    if (gameType === "single") {
      message.textContent =
        winner === "X"
          ? "Wygrałeś! Brawo!"
          : "Przegrałeś. Spróbuj jeszcze raz!";
    } else {
      message.textContent = "Wygrał " + winner + ". Wynik: X: " + multiPlayerScore.X + " - O: " + multiPlayerScore.O + ".";
    }
  } else if (!board.includes("")) {
    message.textContent = "Remis!";
  } else {
    message.textContent = currentPlayer + "'s turn.";
  }
}

function startNewGame() {
  gameActive = true;
  board.fill("");
  currentPlayer = "X";
  updateMessage();

  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
}

function init() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleCellClick);
  }

  newGameBtn.addEventListener("click", startNewGame);
  singlePlayerBtn.addEventListener("click", () => {
    gameType = "single";
    startNewGame();
  });
  multiPlayerBtn.addEventListener("click", () => {
    gameType = "multi";
    startNewGame();
  });
}

init();

    
