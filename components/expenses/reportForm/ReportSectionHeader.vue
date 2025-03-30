<!-- <script setup lang="ts">
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
</style> -->

<template>
    <div class="report-title-wrapper">
        <h3 class="report-title">{{ props.label }}</h3>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string
}>()
</script>

<style scoped>
.report-title-wrapper {
    width: 90%;
    margin: 2rem auto 1.2rem;
    border-left: 6px solid #000080;
    background: linear-gradient(to right, #f0f8ff, #e1e9ff);
    border-top-right-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    padding: 1rem 1.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.report-title {
    font-weight: 600;
    font-size: 1.1rem;
    color: #000080;
    margin: 0;
}
</style>
