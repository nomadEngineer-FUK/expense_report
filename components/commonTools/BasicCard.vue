<template>
    <div class="basic-card">
        <slot />
    </div>
</template>

<style scoped>
.basic-card {
    background-color: #fdfdfd;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    transition: 0.3s;
    min-width: 120px;
}
.basic-card:hover {
    background-color: aliceblue;
}
</style>
