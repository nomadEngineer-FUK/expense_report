<template>
    <div class="layout-container">
        <Sidebar class="layout-sidebar" />
        <main class="layout-main">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.layout-container {
    display: flex;
    min-height: 100vh;
}
.layout-main {
    margin-left: 12%;
    overflow-y: auto;
}
</style>