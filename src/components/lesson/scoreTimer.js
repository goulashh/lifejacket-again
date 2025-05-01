import $bus from '../../globaleventbus';

class ScoreTimer {
    constructor(duration, maxScore) {
        this.duration = duration;
        this.remainingDuration = duration;
        this.maxScore = maxScore;
        this.countUpdate = null;

        // Bind the method to the current instance
        this.handleEnableProgressionTimer = this.handleEnableProgressionTimer.bind(this);
        
        // Add the listener
        $bus.$on('enable_progression_timer', this.handleEnableProgressionTimer);
    }

    handleEnableProgressionTimer(score) {
        console.log("enable_progression_timer event received with score:", score);
        if (score === 0) {
            this.stop('enable_progression', 0);
        } else {
            // Calculate the score based on the time remaining
            const calculatedScore = Math.round(this.maxScore * (this.remainingDuration / this.duration));
            console.log("THERE SHOULD ONLY BE ONE OF THESE");
            console.log(`${this.maxScore} * ${this.remainingDuration} / ${this.duration} = ${calculatedScore}`);
            this.stop('enable_progression', calculatedScore);
        }
    }

    start() {
        this.countUpdate = setInterval(() => {
            if (this.remainingDuration > 0) {
                this.remainingDuration -= 1;
                console.log(this.remainingDuration + "S REMAINING");
            } else {
                clearInterval(this.countUpdate);
                this.stop('timeup');
            }
        }, 1000);
    }

    stop(emit, params) {
        clearInterval(this.countUpdate);
        $bus.$emit(emit, params);
    }

    get_time() {
        return this.remainingDuration;
    }

    reset() {
        this.remainingDuration = this.duration;
        this.countUpdate = null;
    }

    cleanup() {
        // Remove the event listener when no longer needed
        $bus.$off('enable_progression_timer', this.handleEnableProgressionTimer);
    }
}

export default ScoreTimer;
