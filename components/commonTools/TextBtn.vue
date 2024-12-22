<script setup lang="ts">
const props = defineProps<{
    text: string;
    buttonTextColor?: string;
    buttonBgColor?: string;
    buttonHoverTextColor?: string;
    buttonHoverBgColor?: string;
}>();

</script>

<template>
    <button
        class="text-btn"
        :class="[buttonBgColor, buttonTextColor, buttonHoverTextColor, buttonHoverBgColor]"
    >
        {{ props.text }}
    </button>
</template>
<style scoped>
.text-btn {
    font-weight: bold;
    font-size: 0.8rem;
    letter-spacing: 0.1rem;
    padding: 0.4rem 0.5rem 0.4rem 0.6rem;
    border-radius: 6px;
}
.text-btn:hover {
    opacity: 0.8;
}
</style>
