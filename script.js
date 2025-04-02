//your JS code here. If required.
	document.getElementById('submit').addEventListener('click', function() {
            const player1 = document.getElementById('player-1').value;
            const player2 = document.getElementById('player-2').value;
            
            if (player1 && player2) {
                document.querySelector('h1').style.display = 'block';
                document.querySelector('.message').textContent = `${player1}, you're up!`;
                document.querySelector('.board').style.display = 'grid';
            }
        });

        let currentPlayer = 'X';
        let players = {};
        document.getElementById('submit').addEventListener('click', function() {
            players = { 'X': document.getElementById('player-1').value, 'O': document.getElementById('player-2').value };
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
            return winningCombos.find(combo => {
                if (combo.every(id => document.getElementById(id).textContent === currentPlayer)) {
                    highlightWinningCells(combo);
                    return true;
                }
                return false;
            });
        }

        function highlightWinningCells(combo) {
            combo.forEach(id => document.getElementById(id).classList.add('winner'));
        }







