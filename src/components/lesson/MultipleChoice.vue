<template>
    <h1>{{ content.question }}</h1>
    <button
    class="glassy ishoverable p-2 m-1"
    :disabled="isAnswered"
    v-for="answer in content.answers"
    @click="checkAnswer(answer.index)"
    >{{ answer.text }}</button>
</template>

<script>
export default {
    props: {content: {type: Object, required: true}},
    data() {return {isAnswered: false}},
    methods: {
        checkAnswer(index) {
            this.isAnswered = true;
            if(index == this.content.correctAnswer) {
                console.log("PRESSED");
                this.$bus.$emit('enable_progression', 100);}
            else {this.$bus.$emit('enable_progression', 0);}
        }
    },
    created() {this.$bus.$on('signal_next', () => {this.isAnswered = false;});}
}
</script>