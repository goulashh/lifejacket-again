<template>
    <div id="game-main" class="glassy p-3"/>
</template>

<script>
export default {
    props: {
        // Supplied prop allows for any game file to be imported.
        // All game files will share a parent object.
        gameFile: {type: String, required: true}
    },
    async created() {
        // Using the prop from above, the game file will be imported and set to work with.
        const gameObject = await import(`./${this.gameFile}.js`);
    }
}
</script>