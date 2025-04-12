<template>
    <Doughnut
    class=""
    :data="pieData"
    :key="pieData.datasets[0].data.join(',')"
    :options="{
        cutout: '70%',
        plugins: {
            legend: {
                display: false
            }
        }
    }"
    />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
    props: {
        pieData: {
            type: Object,
            required: true
        }
    },
    components: {
        Doughnut
    }
}
</script>