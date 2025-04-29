<template>
    <div id="lesson-main">
        <div id="lesson-topbar" class="glassy p-2">
            <p id="score-count" class="glassy p-2 m-1">Score: {{ totalScore }}</p>
            <progress id="progress-bar" 
            class="glassy m-1"
            :value="position" :max="lessonParts.length"/>
            <button id="progression-button"
            class="glassy ishoverable p-2 m-1"
            :disabled="!goNext"
            @click="$bus.$emit('signal_next')"
            >{{ buttonText }}</button>
        </div>
        <div id="lesson-body" class="glassy my-2">
            <read-only
            v-if="lessonParts[position].type === 'read only'"
            :content="lessonParts[position].content"/>
            <multiple-choice
            v-if="lessonParts[position].type === 'multiple choice'"
            :content="lessonParts[position].content"/>
            <game-handler
            v-if="lessonParts[position].type === 'game'"
            :gameFile="lessonParts[position].content"/>
        </div> 
    </div>
</template>

<script>
import axios from 'axios';
import MultipleChoice from '@/components/lesson/MultipleChoice.vue';
import ReadOnly from '@/components/lesson/ReadOnly.vue';
import GameHandler from '@/components/games/GameHandler.vue';

export default {
    props: {
        lessonID: {
            type: Number,
            required: true
        }
    },
    components: {
        MultipleChoice,
        ReadOnly,
        GameHandler
    },
    data() {
        return {
            position: 0,
            totalScore: 0,
            goNext: false,
            lessonParts: [
                {type: "read only", content: {
                    title: "TEST TITLE",
                    text: "TEST TEXT"
                }},
                {type: 'multiple choice', content: {
                    question: "TEST QUESTION ANSWER IS A",
                    answers: [
                        {index: 1, text: "A"},
                        {index: 2, text: "B"},
                        {index: 3, text: "C"},
                        {index: 4, text: "D"}
                    ],
                    correctAnswer: 1
                }},
                {type: 'multiple choice', content: {
                    question: "TEST QUESTION ANSWER IS A",
                    answers: [
                        {index: 1, text: "A"},
                        {index: 2, text: "B"},
                        {index: 3, text: "C"},
                        {index: 4, text: "D"}
                    ],
                    correctAnswer: 1
                }},
                {type: 'game', content: 'DataJetski'},
            ]
        }
    },
    computed: {
        buttonText() {
            if(this.lessonParts.length - 1 == this.position){return "Finish";}
            else {return "Next";}
        }
    },
    methods: {
        handleEnableProgression(score) {
            // Allows the user to press next, but doesn't progress until button is pressed.
            console.log(`TS ${this.totalScore} + S ${score} = ${this.totalScore + score}`);
            this.totalScore += score;
            this.goNext = true;
        },
        async handleSignalNext() {
            // For when the next button is pressed...
            if(this.lessonParts.length -1 == this.position) {
                // This means the lesson has finished.
                try {
                    await axios.post('http://localhost:5000/api/submit', {
                    score: this.totalScore,
                    lessonID: this.lessonID,
                    studentID: sessionStorage.getItem('studentID')
                    });
                    alert(`Finished the lesson with a score of ${this.totalScore}. \nWell done!`);
                    this.$router.push('../../dash');
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            }
            else {
                // If it hasn't finished, then the lesson progresses
                this.goNext = false;
                this.position++;
            }
        }
    },
    async created() {
        this.lessonParts = (await axios.get(`http://localhost:5000/api/getLessonParts/${this.lessonID}`)).data;
        console.log("LESSON PARTS: " + this.lessonParts);

        this.$bus.$on('enable_progression', this.handleEnableProgression);
        this.$bus.$on('signal_next', this.handleSignalNext);
    },
    beforeUnmount() {
        this.$bus.$off('enable_progression', this.handleEnableProgression);
        this.$bus.$off('signal_next', this.handleSignalNext);
    }
}
</script>