<template>
    <div
    class="lesson-summary-button glassy w-full"
    >
    <table class="w-full">
        <tbody class="flex justify-between items-center">
            <tc class="p-2 m-1">{{ data.LessonName }}</tc>
            <tc class="p-2 m-1">Score: {{ data.Score }}</tc>
            <tc>
                <router-link
                :to="'/lesson/'+data.LessonID+'/review'" 
                class="glassy ishoverable p-2 m-1"
                >Review</router-link>
                <router-link
                :to="'/lesson/'+data.LessonID+'/go'" 
                class="glassy ishoverable p-2 m-1"
                >Start Attempt</router-link>
            </tc>
        </tbody>
    </table>
    
</div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>