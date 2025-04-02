//your JS code here. If required.
	document.getElementById('submit').addEventListener('click', function() {
            const player1 = document.getElementById('player1').value;
            const player2 = document.getElementById('player2').value;
            
            if (player1 && player2) {
                document.querySelector('h1').style.display = 'block';
                document.querySelector('.message').textContent = `${player1}, you're up!`;
                document.querySelector('.board').style.display = 'grid';
			}
	});
        

        let currentPlayer = 'X';
        let players = {'X': player1, 'O': player2};
// Add event listeners to cells
        document.getElementById('submit').addEventListener('click', function() {
            players = { 'X': document.getElementById('player1').value, 'O': document.getElementById('player2').value };
        });
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', function() {
                if (!this.textContent) {
                    this.textContent = currentPlayer;
                    if (checkWin()) {
                        document.querySelector('.message').textContent = `${players[currentPlayer]}, congratulations you won!`;
                        highlightWinningCells();
                        return;
                    }
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    document.querySelector('.message').textContent = `${players[currentPlayer]}, you're up!`;
                }
            });
        });
	

      function checkWin() {
    const winningCombos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];
    
    for (let combo of winningCombos) {
        if (combo.every(id => document.getElementById(id).textContent === currentPlayer)) {
            highlightWinningCells(combo);
            return combo;  // Return the winning combo instead of `true`
        }
    }
    return null;  // Return null if no one has won yet
}

function highlightWinningCells(combo) {
    if (combo) { // Ensure combo is not undefined
        combo.forEach(id => document.getElementById(id).classList.add('winner'));
    }
}


