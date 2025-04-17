/*
DATA JETSKI
This game will be included in sections discussing where data should/n't be given and
to what degree.
The game is a 'runner' style game with lanes for 
    'privacy'
    'anonymity' and
    'unsafe/avoid'
The user will be presented with mockup websites and choose a lane to go down
The incorrect lane choice will result in them being eaten by a sea creature, losing a life.
The players will have three lives.
 */

import GameBase from "./GameBase"

class DataJetski extends GameBase {
    constructor() {
        super();
        console.log(this.gameMain);
        this.player = {
            lane: 1, // Middle lane out of 0/1/2
            lives: 3,
            //sprites: new Image(),
        }
        this.dangerRocks = []; // Will have 'rocks' added to it at random.
        //this.player.sprites.onload = function() {
        //    context.drawImage(this.player.sprites, 10, 10, 100, 100);
        //}
        this.setup_input();
        //this.rockImg = new Image(); this.rockImg.src = "./rock.svg";
        //this.rockImg.onload = () => {
        //    // The game will throw an error unless the image is loaded.
        //    this.run();
        //};
    }
    setup_input() {
        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'a': case 'A': // Left
                    // Only move left if there is a lane to go in to!
                    if(this.player.lane >= 1) {this.player.lane -= 1;}
                    break;
                case 'd': case 'D': // Right
                    // Only move right if there is a lane to go in to!
                    if(this.player.lane <= 1) {this.player.lane += 1;}
                    break;
            }
        });
    }
    game_logic() {
        if(this.dangerRocks.length < 3) {
            this.dangerRocks.push({
                lane: Math.floor(Math.random() * 3),
                x: this.gameCanvas.canvas.width
            });
        }
        this.dangerRocks.forEach((rock, index) => {
            rock.x -= this.gameCanvas.canvas.width*0.01;
            if(rock.x >= 20 && rock.x <= 50 && rock.lane == this.player.lane) {
                // Collision has occured!
                console.log("Collision has occured!");
                this.player.lives -= 1;
                if(this.player.lives == 0) {
                    game.isRunning = false;
                }
                this.dangerRocks.splice(index, 1);
            }
            if(rock.x <= -10) {this.dangerRocks.splice(index, 1);}
        });
    }
    draw() {
        const ctx = this.gameCanvas.context;
        ctx.clearRect(0, 0, this.gameCanvas.canvas.width, this.gameCanvas.canvas.height); // Clear the canvas
        ctx.fillStyle = 'blue'; // Set the square color
        ctx.fillRect(20, this.gameMain.offsetHeight*0.3*this.player.lane+20, 30, 30); // Draw the square
        ctx.fillStyle = 'red'; // Set the square color
        this.dangerRocks.forEach((rock, index) => {
            ctx.fillRect(rock.x, this.gameMain.offsetHeight*0.3*rock.lane+20, 30, 30); // Draw the rock
            //ctx.drawImage(this.rockImg, rock.x, this.gameMain.offsetHeight*0.3*rock.lane+20, 30, 30);
        });
    }
}

const game = new DataJetski(); game.run();