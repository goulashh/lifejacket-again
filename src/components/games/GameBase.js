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
                this.gameCanvas.canvas.width = 0.98*this.gameMain.offsetWidth; 
                this.gameCanvas.canvas.height = 0.96*this.gameMain.offsetHeight;
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
        };
        loop();
        $bus.$emit('enable_progression', this.score);
    }
}
export default GameBase;