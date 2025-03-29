<script setup lang="ts">
const props = defineProps<{
    label: string
}>();
</script>

<template>
    <h3 class="report-title">{{ props.label }}</h3>
</template>

<style scoped>
.report-title {
    font-weight: bold;
    font-size: larger;
    padding: 0.8rem;
    margin: 3rem auto 2rem;
    border-top-right-radius: 24px;
    border-bottom-left-radius: 24px;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 95%;
    color: aliceblue;
    background-color: #051981cf;
}
</style>
