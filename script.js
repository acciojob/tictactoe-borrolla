//your JS code here. If required.
  document.getElementById('submit').addEventListener('click', function() {
	const player1 = document.getElementById('player1').value;
	const player2 = document.getElementById('player2').value;

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }

    players = { 'X': player1, 'O': player2 };
    currentPlayer = 'X';

    document.querySelector('.input-container').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    document.getElementById('current-player-message').textContent = `${players[currentPlayer]},you're up!`;

    createBoard();
});

let currentPlayer = 'X';
let players = {};

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    
    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.id = i;
        cell.addEventListener('click', () => makeMove(i, cell));
        board.appendChild(cell);
    }
}

function makeMove(cellId, cell) {
    if (cell.textContent) return; // Prevent overwriting a move

    cell.textContent = currentPlayer;

    if (checkWin()) {
        document.getElementById('winner-message').textContent = `${players[currentPlayer]},congratulations you won!`;
        document.getElementById('winner-message').style.display = 'block';
        disableBoard();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('current-player-message').textContent = `${players[currentPlayer]},you're up`;
}

function checkWin() {
    const boardCells = document.querySelectorAll('.cell');
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return (
            boardCells[a].textContent &&
            boardCells[a].textContent === boardCells[b].textContent &&
            boardCells[a].textContent === boardCells[c].textContent
        );
    });
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', makeMove);
    });
}
