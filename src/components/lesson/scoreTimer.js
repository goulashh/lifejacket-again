// Scoretimer is used for multiple question types, but it works the same.
// A wrong answer will always be 0 points
// A correct answer will give a higher score if answered more quickly.

import $bus from '../../globaleventbus';

class ScoreTimer {
    constructor(duration, maxScore) {
        this.duration = duration;
        this.remainingDuration = duration;
        this.maxScore = maxScore;
        this.countUpdate = null;

        // Listener to detect when an answer has been selected (in time)
        $bus.$on('enable_progression_timer', score => {
            if(score == 0) {
                // This means the question was incorrect
                this.stop('enable_progression', 0);
            }
            else {
                // Calculate the score based on the time remaining
                console.log(this.maxScore + "*" + this.remainingDuration + "/" + this.duration + "=" + Math.round(this.maxScore*(this.remainingDuration/this.duration)));
                this.stop('enable_progression', (
                    Math.round(this.maxScore*(this.remainingDuration/this.duration))
                ));
            }
        });
    }
    start() {
        this.countUpdate = setInterval(() => {
            // Progresses time and runs question out by default if unanswered.
            if(this.remainingDuration > 0) {
                this.remainingDuration -= 1;
                console.log(this.remainingDuration + "S REMAINING");
            }
            else{
                clearInterval(this.countUpdate);
                this.stop('timeup');
            }
        }, 1000);
    }
    stop(emit, params) {
        clearInterval(this.countUpdate);
        $bus.$emit(emit, params);
    }
    get_time() {return this.remainingDuration;}
    reset() {
        this.remainingDuration = this.duration;
        this.countUpdate = null;
    }
}
export default ScoreTimer;