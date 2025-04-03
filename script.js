//your JS code here. If required.
 document.getElementById('submit').addEventListener('click', function() {
            const player1 = document.getElementById('player-1').value;
            const player2 = document.getElementById('player-2').value;
            
            if (player1 && player2) {
				 const header = document.querySelector('h1');
				 header.style.display = 'block';
                  header.textContent = "TIC TAC TOE";  // Ensure it's always displayed
                //document.querySelector('h1').style.display = 'block';
                document.querySelector('.message').textContent = `${player1}, you're up!`;
                
                document.getElementById('p1-board-title').textContent = player1;
                document.getElementById('p2-board-title').textContent = player2;
                
                document.getElementById('p1-board').style.display = 'grid';
                document.getElementById('p2-board').style.display = 'grid';

                createBoard('p1-board');
                createBoard('p2-board');
                createBoard('winner-board');
            }
        });

        let currentPlayer = 'X';
        let players = {};
        document.getElementById('submit').addEventListener('click', function() {
            players = { 'X': document.getElementById('player-1').value, 'O': document.getElementById('player-2').value };
        });
        
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
            if (!boardCell.textContent && boardId === `p${currentPlayer === 'X' ? 1 : 2}-board`) {
                boardCell.textContent = currentPlayer;
				winnerCell.textContent = currentPlayer; // update the winner board with the current move
                if (checkWin(boardId)) {
					document.getElementById('winner-board-title').textContent = "TIC TAC TOE";
					 document.getElementById('winner-board-title').textContent = `${players[currentPlayer]}, congratulations you won!`;
                    document.getElementById('winner-board-title').style.display = 'block';
                    document.getElementById('winner-board').style.display = 'grid';
                    document.querySelector('.message').textContent = `${players[currentPlayer]}, congratulations you won!`;  
                    highlightWinnerBoard();
                    return;
                }
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                document.querySelector('.message').textContent = `${players[currentPlayer]}, you're up!`;
				document.getElementById('p1-message').textContent = `${player1}, you're up!`;
               document.getElementById('p1-message').textContent = `${player2}, you're up!`;

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
                if(Cell.textContent){
                    cell.classList.add('winner');
				}		
            });
			 document.getElementById('winner-board-title').textContent = "TIC TAC TOE - Winner!";
        }


