import $bus from "@/globaleventbus";

class GameBase{
    // Generic parent class for games.
    constructor() {
        this.score = 0;
        this.isRunning = false;
        this.gameCanvas = {
            canvas: document.createElement("canvas"),
            start: function() {
                const gameMain = document.getElementById("game-main");
                this.canvas.width = gameMain.offsetWidth; this.canvas.height = gameMain.offsetHeight;
                this.context = this.canvas.getContext("2d");
                gameMain.appendChild(this.canvas);
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