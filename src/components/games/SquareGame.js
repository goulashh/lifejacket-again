import { getTransitionRawChildren } from 'vue';
import GameBase from './GameBase.js'; // Adjust the import path as necessary

class SquareGame extends GameBase {
    constructor() {
        super();
        this.square = {
            x: 50,
            y: 50,
            size: 30,
            speed: 5
        };
        this.dx = 0; this.dy = 0;
        this.setupInput(); // Set up input handling
    }

    setupInput() {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    if(this.dy-0.5!=0){this.dy -= 50;}
                    break;
                case 'ArrowDown':
                    this.dy = this.square.speed;
                    break;
                case 'ArrowLeft':
                    this.dx = - this.square.speed;
                    break;
                case 'ArrowRight':
                    this.dx = this.square.speed;
                    break;
            }
        });
        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                    this.dy = 0;
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    this.dx = 0;
                    break;
            }
        });
    }

    game_logic() {
        // Apply gravity
        this.dy += 0.5; // Increase downward velocity due to gravity

        // Update position based on current velocity
        this.square.x += this.dx;
        this.square.y += this.dy;

        // Check horizontal boundaries
        if (this.square.x < 0) {
            this.square.x = 0; // Prevent moving out of bounds on the left
            this.dx = 0; // Stop horizontal movement
        }
        if (this.square.x + this.square.size > this.gameCanvas.canvas.width) {
            this.square.x = this.gameCanvas.canvas.width - this.square.size; // Prevent moving out of bounds on the right
            this.dx = 0; // Stop horizontal movement
        }

        // Check vertical boundaries
        if (this.square.y < 0) {
            this.square.y = 0; // Prevent moving out of bounds at the top
            this.dy = 0; // Stop upward movement
        }
        if (this.square.y + this.square.size > this.gameCanvas.canvas.height) {
            this.square.y = this.gameCanvas.canvas.height - this.square.size; // Prevent moving out of bounds at the bottom
            this.dy = 0; // Stop downward movement
        }

    }

    draw() {
        const ctx = this.gameCanvas.context;
        ctx.clearRect(0, 0, this.gameCanvas.canvas.width, this.gameCanvas.canvas.height); // Clear the canvas
        ctx.fillStyle = 'white'; // Set the background color to white
        ctx.fillRect(0, 0, this.gameCanvas.canvas.width, this.gameCanvas.canvas.height);
        ctx.fillStyle = 'blue'; // Set the square color
        ctx.fillRect(this.square.x, this.square.y, this.square.size, this.square.size); // Draw the square
    }
}

// Create an instance of the game and start it
const game = new SquareGame();
game.run();
