<template>
    <!--
    Navbar.vue
    A navigation bar that will be at the top of all app screens
    with the exception of the login screen
    -->
    <nav>
        <router-link class="glassy ishoverable p-2" to="/dash">LifeJacket</router-link>
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
        <p class="glassy p-2">CURRENT LOCATION</p>
        <router-link class="glassy ishoverable p-2" to="/settings">Settings</router-link>
        <button class="glassy ishoverable p-2" :@click.prevent="logout()">Log Out</button>
    </nav>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            taskCount: [] // Will be filled in via method.
        };
    },
    mounted() {
        this.getTaskCount();
    },
    methods: {
        async getTaskCount() {
            const taskList = await axios.get(`http://localhost:5000/api/getTaskCount/${0 /* replace with session student id */}`);
            console.log("TASKLIST:  ", taskList.data);
            this.taskCount = taskList.data;
        },
        logout() {
            // Send a server request to log user out
            // Go back to the login screen
        }
    }
}
</script>