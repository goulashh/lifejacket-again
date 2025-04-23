import GameBase from "./GameBase";

class AnimationTest extends GameBase {
    constructor() {
        super();
        this.sprite = new Image();
        this.sprite.src = require('./blob.svg'); // Load the sprite image
        this.sprite.onload = () => {
            this.run();
        };

        // Animation properties
        this.spriteWidth = 500; // Width of one sprite
        this.spriteHeight = 500; // Height of the sprite
        this.currentFrame = 0; // Current frame to display
        this.totalFrames = 3; // Total number of frames in the sprite sheet
        this.x = 0; // Initial x position
        this.y = 0; // Initial y position
        this.frameSpeed = 0.1; // Speed of frame change
    }

    setup_input() {
        // Handle input if needed
    }

    game_logic() {
        // Update the current frame based on time
        this.currentFrame += this.frameSpeed;
        if (this.currentFrame >= this.totalFrames) {
            this.currentFrame = 0; // Loop back to the first frame
        }
    }

    draw() {
        const ctx = this.gameCanvas.context;
        ctx.clearRect(0, 0, this.gameCanvas.canvas.width, this.gameCanvas.canvas.height);

        // Calculate the frame to draw
        const frameX = Math.floor(this.currentFrame) * this.spriteWidth;

        // Draw the current frame of the sprite
        ctx.drawImage(this.sprite, frameX, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
}

const game = new AnimationTest();