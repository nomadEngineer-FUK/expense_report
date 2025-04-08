<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <section class="dashboard-section">
        <h2 class="section-title">{{ title }}</h2>
        <div class="slot-wrapper">
            <slot />
        </div>
    </section>
</template>

<style scoped>
.dashboard-section {
    width: 70%;
    margin: 0 auto;
    padding: 1rem 3rem;
    margin-bottom: 1.6rem;
    background-color: #f5f5f5;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.dashboard-section {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    margin-bottom: 2rem;
}
.section-title {
    margin-bottom: 2rem;
    font-size: 1.1rem;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
}
.slot-wrapper {
    padding: 0 3.2rem;
}

@media (max-width: 768px) {
    .dashboard-section {
        text-align: center;
        padding: 1rem 1.6rem;
        width: 90%;
        
    }
}
</style>
