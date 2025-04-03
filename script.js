//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player-1').value.trim();
    const player2 = document.getElementById('player-2').value.trim();
    
    if (!player1 || !player2) {
        alert("Please enter names for both players!");
        return;
    }

    document.querySelector('.game-container').style.display = 'block';
    
    document.getElementById('game-message').textContent = `${player1}, you're up!`; // ✅ One message
    document.getElementById('p1-message').textContent = `${player1}, you're up!`;
    document.getElementById('p2-message').textContent = `${player2}, you're up!`;

    createBoard();
});

let currentPlayer = 'X';
let players = {};
let boardState = Array(9).fill(null);

function createBoard() {
    createIndividualBoard('p1-board');
    createIndividualBoard('p2-board');
    players = {
        'X': document.getElementById('player-1').value,
        'O': document.getElementById('player-2').value
    };
}

function createIndividualBoard(boardId) {
    const board = document.getElementById(boardId);
    board.innerHTML = ''; 
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleMove);
        board.appendChild(cell);
    }
}

function handleMove(event) {
    const cellIndex = event.target.dataset.index;

    if (!boardState[cellIndex]) {
        boardState[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;

        // Update both boards
        document.querySelectorAll(`#p1-board .cell[data-index='${cellIndex}']`).forEach(cell => cell.textContent = currentPlayer);
        document.querySelectorAll(`#p2-board .cell[data-index='${cellIndex}']`).forEach(cell => cell.textContent = currentPlayer);

        if (checkWin()) {
            document.getElementById('winner-board-title').style.display = 'block';
            document.getElementById('winner-board').style.display = 'grid';
            document.getElementById('winner-message').textContent = `${players[currentPlayer]}, congratulations you won!`;
            highlightWinner();
            disableBoard();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('game-message').textContent = `${players[currentPlayer]}, you're up!`; // ✅ Updates main message
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        if (
            boardState[pattern[0]] &&
            boardState[pattern[0]] === boardState[pattern[1]] &&
            boardState[pattern[0]] === boardState[pattern[2]]
        ) {
            pattern.forEach(index => {
                document.querySelectorAll(`.cell[data-index='${index}']`).forEach(cell => cell.classList.add('winner'));
            });
            return true;
        }
        return false;
    });
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleMove));
}
