<template>
<div id="dash-main">

    <div class="glassy mx-1 p-3" id="dash-topic-div">
        <div id="dash-teacher" v-if="isTeacher">
            <div class="flex justify-center"><h1>Classes</h1></div>
        </div>
        <div v-if="!isTeacher">
            <div class="flex justify-center"><h1>Topics</h1></div>
            <div class="flex flex-wrap justify-between items-center justify-center">
                <topic-summary-button
                class="glassy ishoverable p-3 m-2"
                v-for="topic in topicSummaries"
                :key="topic.topicID"
                :topicData="topic"/>
            </div>
        </div>
    </div>

    <div class="glassy mx-1 p-3" id="dash-leaderboard-div">
        <div class="flex justify-center my-1"><h1>Global Leaderboard</h1></div>
        <leaderboard :items="leaderboardData"/>
    </div>

</div>
</template>


<script>
import axios from 'axios';
import TopicSummaryButton from '@/components/TopicSummaryButton.vue';
import Leaderboard from '@/components/Leaderboard.vue';

export default {
    components: {
        TopicSummaryButton,
        Leaderboard
    },
    data() {
        return {
            topicSummaries: [],
            leaderboardData: []
        }
    },
    created() {
        this.isTeacher = (sessionStorage.getItem('teacherID') == true);
        if(this.isTeacher == true) {
            // Teachery logic goes here.
        }
        else {
            this.getTopicSummaries();
        }
        this.getLeaderboard();
    },
    methods: {
        async getTopicSummaries() {
            try {
                const response = await axios.get(`http://localhost:5000/api/topicsummary/${sessionStorage.getItem('studentID')}`);
                this.topicSummaries = response.data;
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        async getLeaderboard() {
            try {
                const response = await axios.get('http://localhost:5000/api/leaderboard/global/0');
                this.leaderboardData = response.data;
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        }
    }
}
</script>