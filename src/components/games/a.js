import GameBase from "./GameBase";

class AvoidTheNetTrackers extends GameBase {
    constructor() {
        super();
        console.log("AAA");
        this.player = {
            pos: [0, 0],
            sprites: new Image(),
        };

        this.activeNets = []; // To keep track of currently displayed nets
        this.netDuration = 5000; // 5 seconds
        this.netSpawnInterval = 3000; // 3 seconds

        this.nets = [
            { tracker: true, name: "Third Party Cookies",
                explanation: "Third Party Cookies are small bits of data stored on your device by sites with different domains (website links). If another site uses the same third party cookies, they can read them and learn about the sites you visit!" },
            { tracker: true, name: "Dark Patterns",
                explanation: "PLACEHOLDER" },
        ];

        this.setup_input();
        this.player.sprites.src = require('@/assets/logo.png');
        this.player.sprites.onload = () => {
            this.run();
        };

        // Start the net spawning timer
        this.startNetTimer();
    }

    setup_input() {
        window.addEventListener('mousemove', (event) => {
            const rect = this.gameCanvas.canvas.getBoundingClientRect();
            this.player.pos[0] = event.clientX - rect.left; // Update player X position
            this.player.pos[1] = event.clientY - rect.top; // Update player Y position
        });
    }

    startNetTimer() {
        setInterval(() => {
            this.spawnNet();
        }, this.netSpawnInterval);
    }

    spawnNet() {
        const randomNet = this.nets[Math.floor(Math.random() * this.nets.length)];
        const net = {
            name: randomNet.name,
            explanation: randomNet.explanation,
            pos: [Math.random() * this.gameCanvas.canvas.width, Math.random() * this.gameCanvas.canvas.height],
            alpha: 1, // Full opacity
            startTime: Date.now()
        };
        this.activeNets.push(net);
    }

    game_logic() {
        const currentTime = Date.now();
        this.activeNets = this.activeNets.filter(net => {
            // Check if the net should fade out
            if (currentTime - net.startTime > this.netDuration) {
                net.alpha -= 0.01; // Decrease opacity
                return net.alpha > 0; // Keep net if it's still visible
            }
            return true; // Keep net if it's not faded out
        });
    }

    draw() {
        console.log("A");
        const ctx = this.gameCanvas.context;
        ctx.clearRect(0, 0, this.gameCanvas.canvas.width, this.gameCanvas.canvas.height); // Clear the canvas

        // Draw player
        ctx.drawImage(this.player.sprites, this.player.pos[0], this.player.pos[1]);

        // Draw active nets
        this.activeNets.forEach(net => {
            ctx.fillStyle = `rgba(0, 0, 255, ${net.alpha})`; // Blue color for nets with fading effect
            ctx.beginPath();
            ctx.arc(net.pos[0], net.pos[1], 20, 0, Math.PI * 2); // Draw a circle for the net
            ctx.fill();

            // Optionally, you can draw the name or explanation text
            ctx.fillStyle = `rgba(0, 0, 0, ${net.alpha})`; // Black color for text
            ctx.fillText(net.name, net.pos[0] - 30, net.pos[1] - 30); // Draw the name above the net
        });
    }
}
const game = new AvoidTheNetTrackers();