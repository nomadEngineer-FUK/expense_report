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
    border: 2px solid #000080;
    color: #000080;
    background-color: #c3dcf4e5;
    background: linear-gradient(to right, #f0f8ff, #c3dcf4e5);
}
</style>
