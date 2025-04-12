<template>
    <button
    @click.prevent="this.$router.push(`course/${topicData.courseID}/topic/${topicData.topicID}`)"
    class="topic-summary-button glass-effect"
    >
        <pie-chart
        :pieData="pieData"
        />
        <p>{{ topicData.topicName }}</p>
    </button>
    </template>
    
    <script>
    import PieChart from './PieChart.vue';
    
    export default {
        components: {
            PieChart
        },
        props: {
            topicData: {
                type: Object,
                required: true
            }
        },
        computed: {
            pieData() {
                return {
                    labels: ['Poor', 'Okay', 'Good', 'Incomplete'],
                    datasets: [
                        {
                            backgroundColor: [
                            'rgba(255, 105, 180, 0.8)', // Hot Pink -         Poor
                            'rgba(255, 255, 102, 0.8)', // Bright Yellow -    Okay
                            'rgba(76, 175, 80, 0.8)',   // Medium Green -     Good
                            'rgba(70, 130, 180, 0.8)',  // Steel Blue -       Incomplete
                            ],
                            data: [
                                this.topicData.scores.poor,
                                this.topicData.scores.okay,
                                this.topicData.scores.good,
                                this.topicData.scores.notDone
                            ]
                        }
                    ]
                };
            }
        }
    }
    </script>