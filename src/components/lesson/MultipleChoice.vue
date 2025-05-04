<template>
    <div id="multiple-choice-main" class="p-3">
        <p id="timer" class="glassy p-2">{{ scoreTimer.get_time() }}</p>
        <h1 id="question">{{ content.question }}</h1>
        <div id="answers">
            <button
                class="glassy ishoverable p-2 m-1"
                :disabled="isAnswered"
                v-for="answer in content.answers"
                @click="checkAnswer(answer.index)"
                :class="{
                    'correct': isAnswered && (answer.index == content.correctAnswer),
                    'incorrect': isAnswered && !(answer.index == content.correctAnswer)
                }"
            >{{ answer.text }}</button>
        </div>
    </div>
</template>

<script>
import ScoreTimer from './scoreTimer';

export default {
    props: { content: { type: Object, required: true } },
    data() {
        return {
            isAnswered: false,
            scoreTimer: null // Initialize as null
        }
    },
    watch: {
        content(newValue, oldValue) {
            console.log("was " + oldValue + ", now " + newValue);
            if (this.scoreTimer) {
                this.scoreTimer.cleanup(); // Clean up the previous timer
            }
            this.scoreTimer = new ScoreTimer(60, 100);
            this.scoreTimer.start();
        }
    },
    methods: {
        checkAnswer(index) {
            this.isAnswered = true;
            if (index == this.content.correctAnswer) {
                this.$bus.$emit('enable_progression_timer');
            } else {
                this.$bus.$emit('enable_progression_timer', 0);
            }
        },
        handleTimeup() {
            this.isAnswered = true;
            const finalScore = Math.round(this.scoreTimer.maxScore * (this.scoreTimer.get_time() / this.scoreTimer.duration));
            this.$bus.$emit('enable_progression', finalScore);
        },
        handleSignalNext() {
            this.isAnswered = false;
        }
    },
    created() {
        this.scoreTimer = new ScoreTimer(60, 100);
        this.scoreTimer.start();
        console.log("Q");
        this.$bus.$on('timeup', this.handleTimeup);
        this.$bus.$on('signal_next', this.handleSignalNext);
    },
    beforeUnmount() {
        this.$bus.$off('timeup', this.handleTimeup);
        this.$bus.$off('signal_next', this.handleSignalNext);
        if (this.scoreTimer) {
            this.scoreTimer.cleanup(); // Clean up the timer when the component is unmounted
        }
    }
}
</script>