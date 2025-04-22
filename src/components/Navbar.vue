<template>
    <!--
    Navbar.vue
    A navigation bar that will be at the top of all app screens
    with the exception of the login screen
    -->
    <nav :hidden="hide()">
        <!--Homepage Link-->
        <router-link class="glassy ishoverable p-2" to="/dash">LifeJacket</router-link>
        <!--This part handles tasks-->
        <div class="glassy p-2">
            <router-link class="ishoverable p-2 m-1" to="/tasks">Tasks</router-link>
            <router-link 
            class="ishoverable rounded-full text-sm p-2 m-1"
            v-for="task in taskCount"
            :key="task.name"
            :to="'/tasks/'+task.name"
            :id="task.name" :title="task.name"
            > {{ task.count }} </router-link>
        </div>
        <!--Current location-->
        <p class="glassy p-2">{{ routeText }}</p>
        <!--Settings page and log out button-->
        <router-link class="glassy ishoverable p-2" to="/settings">Settings</router-link>
        <button class="glassy ishoverable p-2" @click="logout()">Log Out</button>
    </nav>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import $bus from '@/globaleventbus';

export default {
    data() {
        return {
            taskCount: [], // Will be filled in via method.
            routeText: "default"
        };
    },
    created() {
        $bus.$on('pageChangeTick', () => {
            this.routeText = "📍" + document.title;
        });
    },
    mounted() {
        this.getTaskCount();
    },
    methods: {
        // Retrieves the tasks (if any) that this user has.
        async getTaskCount() {
            const taskList = await axios.get(`http://localhost:5000/api/getTaskCount/${sessionStorage.getItem('studentID')}`);
            console.log("TASKLIST:  ", taskList.data);
            this.taskCount = taskList.data;
        },
        // Purges session details so that the user is no longer logged in.
        logout() {
            console.log("RUNNING LOGOUT");
            sessionStorage.removeItem('userID');
            sessionStorage.removeItem('studentID');
            sessionStorage.removeItem('teacherID');
            sessionStorage.removeItem('loginTimestamp');
            router.push('/');
        },
        // Ensures that the navbar remains hidden when on the login page.
        hide() {return (document.title == "Login 🔐");}
    }
}
</script>