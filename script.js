//your JS code here. If required.
 document.getElementById('submit').addEventListener('click', function () {
    const player1 = document.getElementById('player-1').value.trim();
    const player2 = document.getElementById('player-2').value.trim();

    if (player1 && player2) {
        // Store player names
		const header = document.querySelector('h1');
			 header.style.display = 'block';
              header.textContent = "TIC TAC TOE";  // Ensure it's always displayed
        players = { 'X': player1, 'O': player2 };
        currentPlayer = 'X'; // Ensure Player 1 starts

        // Show the Tic Tac Toe title
        document.querySelector('h1').style.display = 'block';

        // Set initial message
        document.querySelector('.message').textContent = `${players['X']}, you're up!`;

        // Update board titles
        document.getElementById('p1-board-title').textContent = player1;
        document.getElementById('p2-board-title').textContent = player2;

        // Show player boards
        document.getElementById('p1-board').style.display = 'grid';
        document.getElementById('p2-board').style.display = 'grid';

        // Set up the message area for players
        document.getElementById('p1-message').textContent = `${players['X']}, you're up!`;
        document.getElementById('p2-message').textContent = ``;

        // Create game boards
        createBoard('p1-board');
        createBoard('p2-board');
        createBoard('winner-board');
    } else {
        alert("Please enter both player names!");
    }
});

let currentPlayer = 'X';
let players = {};

function createBoard(boardId) {
    const board = document.getElementById(boardId);
    board.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `${boardId}-${i}`;
        if (boardId !== 'winner-board') {
            cell.addEventListener('click', () => makeMove(i, boardId));
        }
        board.appendChild(cell);
    }
}

function makeMove(cellId, boardId) {
    const boardCell = document.getElementById(`${boardId}-${cellId}`);
	const winnerCell = document.getElementById(`winner-board-${cellId}`);
    
    // Only allow moves on the correct player's board
    if (!boardCell.textContent && boardId === `p${currentPlayer === 'X' ? 1 : 2}-board`) {
        boardCell.textContent = currentPlayer;

        if (checkWin(boardId)) {
			document.getElementById('winner-board-title').textContent = "TIC TAC TOE";
            document.getElementById('winner-board-title').style.display = 'block';
            document.getElementById('winner-board').style.display = 'grid';
            document.querySelector('.message').textContent = `${players[currentPlayer]}, congratulations you won!`;

            // Update the Winner Board only with the winning player's moves
            updateWinnerBoard(currentPlayer);

            highlightWinnerBoard();
            return;
        }

        // Switch player turn
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        // Update turn messages
        document.getElementById('p1-message').textContent = currentPlayer === 'X' ? `${players['X']}, you're up!` : '';
        document.getElementById('p2-message').textContent = currentPlayer === 'O' ? `${players['O']}, you're up!` : '';
    }
}



function updateWinnerBoard(winningPlayer) {
    for (let i = 1; i <= 9; i++) {
        const p1Cell = document.getElementById(`p1-board-${i}`);
        const p2Cell = document.getElementById(`p2-board-${i}`);
        const winnerCell = document.getElementById(`winner-board-${i}`);

        // If the cell belongs to the winning player, update Winner Board
        if (p1Cell.textContent === winningPlayer) {
            winnerCell.textContent = winningPlayer;
        } else if (p2Cell.textContent === winningPlayer) {
            winnerCell.textContent = winningPlayer;
        } else {
            winnerCell.textContent = ''; // Clear non-winning moves
        }
    }
}

function checkWin(boardId) {
    const winningCombos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];
    return winningCombos.some(combo => {
        if (combo.every(id => document.getElementById(`${boardId}-${id}`).textContent === currentPlayer)) {
            combo.forEach(id => {
                const winnerCell = document.getElementById(`winner-board-${id}`);
                winnerCell.textContent = currentPlayer;
                winnerCell.classList.add('winner');
            });
            return true;
        }
        return false;
    });
}

function highlightWinnerBoard() {
    document.querySelectorAll('#winner-board .cell').forEach(cell => {
        if (cell.textContent) {
            cell.classList.add('winner');
        }
    });
	 document.getElementById('winner-board-title').textContent = "TIC TAC TOE - Winner!";
}
