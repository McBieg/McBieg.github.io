var currentPlayer = "X";
var gameOver = false;
var cells = document.querySelectorAll("td");

cells.forEach(function(cell) {
  cell.addEventListener("click", function() {
    if (!gameOver && cell.innerHTML === "") {
      cell.innerHTML = currentPlayer;
      checkForWinner();
      togglePlayer();
    }
  });
});

function checkForWinner() {
  var winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var combo = winningCombinations[i];
    if (cells[combo[0]].innerHTML !== "" &&
        cells[combo[0]].innerHTML === cells[combo[1]].innerHTML &&
        cells[combo[1]].innerHTML === cells[combo[2]].innerHTML) {
      gameOver = true;
      alert("Gracz " + currentPlayer + " wygrał!");
      break;
    }
    if (cells[combo[0]].innerHTML !== "" &&
        cells[combo[0]].innerHTML !== cells[combo[1]].innerHTML &&
        cells[combo[1]].innerHTML !== cells[combo[2]].innerHTML) {
      gameOver = true;
      alert("Remis!");
      break;
      
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

    
