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
    props: {content: {type: Object, required: true}},
    watch: {content(newValue, oldValue) {
        delete this.scoreTimer;
        this.scoreTimer = new ScoreTimer(60, 100);
        this.scoreTimer.start();
    }},
    data() {
        return {
            isAnswered: false,
            scoreTimer: new ScoreTimer(60, 100)
        }
    },
    methods: {
        checkAnswer(index) {
            this.isAnswered = true;
            if(index == this.content.correctAnswer) {this.$bus.$emit('enable_progression_timer');}
            else {this.$bus.$emit('enable_progression_timer', 0);}
        }
    },
    created() {
        this.scoreTimer.start();
        this.$bus.$on('timeup', () => {
            this.isAnswered = true;
            this.$bus.$emit('enable_progrssion', 0);
        });
        this.$bus.$on('signal_next', () => {
            this.isAnswered = false;
        });
    }
}
</script>