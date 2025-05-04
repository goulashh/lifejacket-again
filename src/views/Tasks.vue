<template>
    <div id="task-main">
        <p>{{ this.tasks }}</p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            tasks: null
        }
    },
    async created() {
        this.tasks = (await axios.get(`http://localhost:5000/api/getTasks/${sessionStorage.getItem('studentID')}`)).data;
    },
}
</script>