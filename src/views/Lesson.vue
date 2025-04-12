<template>
    <div id="lesson-main">
        <div id="lesson-topbar" class="glassy p-2">
            <p id="score-count" class="glassy p-2 m-1">Score: {{ totalScore }}</p>
            <progress id="progress-bar" 
            class="glassy p-2 m-1"
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
        </div> 
    </div>
</template>

<script>
import MultipleChoice from '@/components/lesson/MultipleChoice.vue';
import ReadOnly from '@/components/lesson/ReadOnly.vue';

export default {
    components: {
        MultipleChoice,
        ReadOnly
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
            ]
        }
    },
    computed: {
        buttonText() {
            if(this.lessonParts.length - 1 == this.position){return "Finish";}
            else {return "Next";}
        }
    },
    created() {
        this.$bus.$on('enable_progression', (score) => {
            // Allows the user to press next, but doesn't progress until button is pressed.
            this.totalScore += score;
            this.goNext = true;
        });

        this.$bus.$on('signal_next', () => {
            // For when the next button is pressed...
            if(this.lessonParts.length -1 == this.position) {
                // This means the lesson has finished.
                this.$bus.$emit('submit', this.totalScore);
            }
            else {
                // If it hasn't finished, then the lesson progresses
                this.goNext = false;
                this.position++;
            }
        });
    }
}
</script>