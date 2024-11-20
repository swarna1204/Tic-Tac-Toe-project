class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
        this.playerX = '';
        this.playerO = '';
        this.gameStarted = false;

        // DOM Elements
        this.playerSetup = document.getElementById('player-setup');
        this.gameContainer = document.getElementById('game-container');
        this.statusDisplay = document.getElementById('status');
        this.cells = document.querySelectorAll('.cell');
        this.startButton = document.getElementById('start-game');
        this.resetButton = document.getElementById('reset');
        this.newGameButton = document.getElementById('new-game');
        
        this.initializeGame();
    }

    initializeGame() {
        // Add event listeners
        this.startButton.addEventListener('click', () => this.startGame());
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.newGameButton.addEventListener('click', () => this.newGame());
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
    }

    startGame() {
        const player1Input = document.getElementById('player1');
        const player2Input = document.getElementById('player2');
        
        if (player1Input.value.trim() && player2Input.value.trim()) {
            this.playerX = player1Input.value;
            this.playerO = player2Input.value;
            this.gameStarted = true;
            this.playerSetup.classList.add('hidden');
            this.gameContainer.classList.remove('hidden');
            this.updateStatus();
        }
    }

    handleCellClick(cell) {
        if (!this.gameStarted || this.winner) return;
        
        const index = cell.dataset.index;
        if (this.board[index]) return;

        this.board[index] = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        cell.textContent = this.currentPlayer;

        if (this.checkWinner()) {
            this.winner = this.currentPlayer;
            this.updateStatus();
            return;
        }

        if (this.checkDraw()) {
            this.winner = 'draw';
            this.updateStatus();
            return;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }

    checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winningCombos.some(combo => {
            return combo.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== null);
    }

    updateStatus() {
        if (this.winner === 'draw') {
            this.statusDisplay.textContent = "It's a draw!";
        } else if (this.winner) {
            const winnerName = this.winner === 'X' ? this.playerX : this.playerO;
            this.statusDisplay.textContent = `${winnerName} wins!`;
        } else {
            const currentPlayerName = this.currentPlayer === 'X' ? this.playerX : this.playerO;
            this.statusDisplay.textContent = `${currentPlayerName}'s turn`;
        }
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        this.updateStatus();
    }

    newGame() {
        this.resetGame();
        this.gameStarted = false;
        this.playerX = '';
        this.playerO = '';
        document.getElementById('player1').value = '';
        document.getElementById('player2').value = '';
        this.gameContainer.classList.add('hidden');
        this.playerSetup.classList.remove('hidden');
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});