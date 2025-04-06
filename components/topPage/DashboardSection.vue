<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <section class="dashboard-section">
        <h3 class="section-title">{{ title }}</h3>
        <slot />
    </section>
</template>

<style scoped>
.dashboard-section {
    width: 80%;
    margin: 0 auto;
    padding: 1rem;
}
.section-title {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
}
</style>
