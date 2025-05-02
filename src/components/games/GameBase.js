import $bus from "@/globaleventbus";

class GameBase{
    // Generic parent class for games.
    constructor() {
        this.score = 0;
        this.isRunning = false;
        this.gameMain = document.getElementById("game-main");
        this.gameCanvas = {
            canvas: document.createElement("canvas"),
            start: () => {
                this.gameCanvas.canvas.width = 0.9*this.gameMain.offsetWidth; 
                this.gameCanvas.canvas.height = 0.9*this.gameMain.offsetHeight;
                this.gameCanvas.context = this.gameCanvas.canvas.getContext("2d");
                this.gameMain.appendChild(this.gameCanvas.canvas);
            }
        }
        this.gameCanvas.start();
    }
    game_logic() {}
    draw() {}
    run() {
        this.isRunning = true;
        const loop = () => {
            if (this.isRunning) {
                this.game_logic();
                this.draw();
                requestAnimationFrame(loop);
            }
            else {
                $bus.$emit('enable_progression', this.score);
                alert(`Game Over! You finished with a score of ${this.score}!`);
            }
        };
        loop();
    }
}
export default GameBase;