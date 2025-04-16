<template>
    <div class="flex items-center justify-center">
        <div class="glassy p-6">
            <h1>Login to LifeJacket</h1>
            <br/>
            <form @submit.prevent="login">
                <!-- Username -->
                <div class="mb-4">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required class="glassy m-1 focus:ring focus:ring-blue-500 focus:border-blue-500">
                </div>
                <!-- Password -->
                <div class="mb-4">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required class="glassy m-1 focus:ring focus:ring-blue-500 focus:border-blue-500">
                </div>
                <span id="feedback" class="text-red-500 text-sm"></span>
                <!-- Captcha -->
                <button type="submit" class="w-full glassy ishoverable p-2 m-1">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
export default {
    methods: {
        async login(submitEvent) {
            username = submitEvent.target.elements.username.value;
            password = submitEvent.target.elements.password.value;
            try {
                const response = await axios.post('http://localhost:5000/api/login', {
                    username: username,
                    password: password
                });
                if (response.data.success) {
                    // Store some sort of detail in session so you know who is logged in
                    sessionStorage.setItem('userID', response.data.userID);
                    sessionStorage.setItem('studentID', response.data.studentID);
                    sessionStorage.setItem('teacherID', response.data.teacherID);
                    sessionStorage.setItem('loginTimestamp', response.data.timestamp);
                    router.push('/dash');
                }
                else {}
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        }
    }
}
</script>