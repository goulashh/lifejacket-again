<template>
    <div id="read-only-main" class="p-3">
        <h1 id="title">{{ content.title }}</h1>
        <img v-if="content.image"
        :src="content.image.src" :alt="content.image.alt"
        />
        <p id="text">{{ content.text }}</p>
    </div>
</template>

<script>
export default {
    props: {
        content: {type: Object, required: true}
    },
    created() {
        this.$bus.$emit('enable_progression', 1);
    },
    watch: {content(newValue, oldValue) {
        this.$bus.$emit('enable_progression', 1);
    }}
}
</script>