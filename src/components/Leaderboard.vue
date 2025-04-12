<template>
    <table class="min-w-full bg-white rounded-lg overflow-hidden">
        <thead>
            <tr class="bg-blue-300">
                <th class="py-2 px-4 text-left">Rank</th>
                <th class="py-2 px-4 text-left">Username</th>
                <th class="py-2 px-4 text-left">Score</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(item, index) in items"
                :key="item.Username"
                :class="index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-200'"
            >
                <td class="py-2 px-4">{{ index + 1 }}</td>
                <td class="py-2 px-4">{{ item.Username }}</td>
                <td class="py-2 px-4">{{ item.totalScore }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        items: {
            type: Object,
            required: true
        }
    }
}
</script>