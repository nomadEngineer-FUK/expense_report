<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <section class="dashboard-section">
        <h2 class="section-title">{{ title }}</h2>
        <slot />
    </section>
</template>

<style scoped>
.dashboard-section {
    width: 80%;
    margin: 0 auto;
    padding: 1rem;
    margin-bottom: 1rem;
}
.section-title {
    margin-bottom: 2rem;
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
}
</style>
