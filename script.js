const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let cells = Array(9).fill("");

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] !== "" || checkWinner()) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
  } else if (!cells.includes("")) {
    statusText.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winConditions.some(([a, b, c]) => {
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function resetGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  createBoard();
}

createBoard();
