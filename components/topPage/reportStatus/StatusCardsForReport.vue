<script setup lang="ts">

const props = defineProps<{
    label: string,
    count: number,
}>();
</script>
<template>
    <div class="status-card">
        <div class="label">{{ label }}</div>
        <div class="count">{{ count }} 件</div>
    </div>
</template>

<style scoped>
.status-card {
    flex: 1 1 160px;
    min-width: 140px;
    max-width: 200px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .1);
    padding: 16px;
    background-color: white;
    cursor: pointer;
    text-align: center;
}
.status-card:hover {
    transition: 0.3s;
    background-color: aliceblue;
}
</style>
