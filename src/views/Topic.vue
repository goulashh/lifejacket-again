<template>
    <div id="topic-main">    
        <div class="glassy p-3 mx-1" id="topic-lessons">
            <h2>Lessons</h2>
            <div class="flex flex-wrap justify-between items-center">
                <lesson-button
                class="p-3 m-2"
                v-for="lesson in lessonSummaries"
                :key = "lesson.LessonID"
                :data="lesson"
                />
            </div>
        </div>
    
        <div class="glassy p-3 mx-1" id="topic-leaderboard">
            <h2>Topic Leaderboard</h2>
            <leaderboard class="m-2" :items="leaderboardData"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import Leaderboard from '@/components/Leaderboard.vue';
import LessonButton from '@/components/LessonButton.vue';

export default {
props: {
    courseID: {
        type: Number, 
        required: true
    },
    topicID: {
        type: Number, 
        required: true
    }
},
components: {
    Leaderboard,
    LessonButton
},
data() {
    return {
        name: `📚 Topic ${this.topicID}`,
        studentID: 1,
        lessonSummaries: [],
        leaderboardData: [],
    };
},
created() {
    this.fetchPageData();
},
methods: {
    async fetchPageData() {
        try {
            const response = await axios.get(`http://localhost:5000/api/leaderboard/topic/${this.topicID}`);
            this.leaderboardData = response.data;
        } catch (error) {
            console.error('Error fetching items:', error);
        }
        try {
            const response2 = await axios.get(`http://localhost:5000/api/viewtopic/${this.topicID}/s/${this.studentID}`);
            this.lessonSummaries = response2.data;
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }
}
}
</script>
