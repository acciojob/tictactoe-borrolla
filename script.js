//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player-1').value.trim();
    const player2 = document.getElementById('player-2').value.trim();
    
    if (!player1 || !player2) {
        alert("Please enter names for both players!");
        return;
    }

    document.querySelector('.game-container').style.display = 'block';
    document.getElementById('game-message').textContent = `${player1}, you're up!`;

    createBoard();
});

let currentPlayer = 'X';
let players = {};
let boardState = Array(9).fill(null);

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; 
    boardState = Array(9).fill(null);
    
    players = {
        'X': document.getElementById('player-1').value,
        'O': document.getElementById('player-2').value
    };

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

        if (checkWin()) {
            document.getElementById('game-message').textContent = `${players[currentPlayer]}, congratulations you won!`;
            highlightWinner();
            disableBoard();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('game-message').textContent = `${players[currentPlayer]}, you're up!`;
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
                document.querySelector(`.cell[data-index='${index}']`).classList.add('winner');
            });
            return true;
        }
        return false;
    });
}

function disableBoard() {
    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleMove));
}
