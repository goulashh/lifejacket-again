import GameBase from "./GameBase";

class AvoidTheNetTrackers extends GameBase {
    constructor() {
        super();

        this.player = {
            pos: [0, 0],
            lives: 5,
            sprites: new Image(),
        }

        this.blobs = [
            // Blobs can either be a net (tracker) or treasure (!tracker)
            {tracker: true, name: "Third Party Cookies", timesUsed: 0,
                explanation: "Third Party Cookies are small bits of data stored on your device by sites with different domains (website links). If another site uses the same third party cookies, they can read them and learn about the sites you visit!"},
            {tracker: true, name: "Dark Patterns", timesUsed: 0,
                explanation: "PLACEHOLDER"},
        ];

        this.activeBlobs = [];           // To keep track of currently displayed blobs
        this.blobDuration = 5000;        // 5 seconds
        this.blobSpawnInterval = 3000;   // 3 seconds

        this.setup_input();
        this.player.sprites.src = require('./fish.svg');
        this.player.sprites.onload = () => {
            this.run();
        };
        this.start_blob_timer();
    }

    spawn_blob() {
        this.blobs = this.blobs.filter(blob => blob.timesUsed < 3);
        if(this.blobs.length != 0) {
            const randomChoice = Math.floor(Math.random() * this.blobs.length);
            const randomBlob = this.blobs[randomChoice];
            
            randomBlob.timesUsed++;
            const blob = {
                tracker: randomBlob.tracker,
                name: randomBlob.name,
                explanation: randomBlob.explanation,
                pos: [Math.random() * this.gameCanvas.canvas.width, Math.random() * this.gameCanvas.canvas.height],
                alpha: 1, // Full opacity
                startTime: Date.now(),
                visited: false
            };
            this.activeBlobs.push(blob);
        }
    }

    start_blob_timer() {
        this.blobTimer = setInterval(() => {
            if (this.isRunning) {
                this.spawn_blob();
            } else {
                clearInterval(this.blobTimer); // Clear the interval if not running
            }
        }, this.blobSpawnInterval);
    }

    setup_input() {
        window.addEventListener('mousemove', (event) => {
            const rect = this.gameCanvas.canvas.getBoundingClientRect();
            this.player.pos[0] = event.clientX - rect.left; // Update player X position
            this.player.pos[1] = event.clientY - rect.top; // Update player Y position
        });
    }

    game_logic() {
        const currentTime = Date.now();
        if(this.blobs.length == 0 && this.activeBlobs.length == 0) {
            this.isRunning = false;
            clearInterval(this.blobTimer);
        }
        this.activeBlobs.forEach((blob, index) => {
            // Check if the blob should fade out
            if (currentTime - blob.startTime > this.blobDuration) {
                blob.alpha -= 0.01; // Decrease opacity
    
                // Check if the blob is still visible
                if (blob.alpha <= 0) {
                    // Give score if hasnt been visited
                    if (!blob.visited) {
                        if (blob.tracker) {
                            // An avoided tracker is a good thing
                            this.score += 100;
                        } else {
                            // An avoided non-tracker is a bad thing
                            this.score -= 50;
                        }
                    }
    
                    // Remove the blob from the activeBlobs array
                    this.activeBlobs.splice(index, 1);
                }
            }
            // if the blob isn't fading, is it being touched?
            else if (!blob.visited) {
                const playerRadius = 20;
                const blobRadius = 20;
                const dx = this.player.pos[0] - blob.pos[0];
                const dy = this.player.pos[1] - blob.pos[1];
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < playerRadius + blobRadius) {
                    // Mark the blob as visited
                    blob.visited = true;
                    this.blobs

                    // Adjust score based on whether it's a tracker or not
                    if (blob.tracker) {
                        // Subtract score for touching a tracker
                        this.score -= 50;
                    } else {
                        // Add score for touching a non-tracker
                        this.score += 100;
                    }
                }
            }
       });
    }

    draw() {
        const ctx = this.gameCanvas.context;
        ctx.clearRect(0, 0, this.gameCanvas.canvas.width, this.gameCanvas.canvas.height); // Clear the canvas
        
        // Draw player
        ctx.drawImage(this.player.sprites, this.player.pos[0], this.player.pos[1], 50, 50);

        this.activeBlobs.forEach(blob => {
                if(blob.visited) {
                    if(blob.tracker) {
                        ctx.fillStyle = `rgba(255, 0, 0, ${blob.alpha})`;
                    }
                    else {
                        ctx.fillStyle = `rgba(0, 255, 0, ${blob.alpha})`;
                    }
                } 
                else {
                    ctx.fillStyle = `rgba(0, 0, 255, ${blob.alpha})`;
                }
            ctx.beginPath();
            ctx.arc(blob.pos[0], blob.pos[1], 50, 0, Math.PI * 2);
            ctx.fill();
        
            // Set text properties
            ctx.fillStyle = `rgba(255, 255, 255, ${blob.alpha})`;
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
        
            // Draw the name centered in the circle
            ctx.fillText(blob.name, blob.pos[0], blob.pos[1]); // Draw the name in the center of the net
        });
        // Draw the score at a fixed position
        ctx.fillText(this.score, 20, 20);
    }
}

const game = new AvoidTheNetTrackers();