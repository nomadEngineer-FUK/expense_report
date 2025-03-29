<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
    isLastForm: {
        type: Boolean,
        required: true,
    },
})
</script>

<template>
    <div class="wrapper-plus-minus-btn">
        <button
            class="btn-text"
            @click="$emit('remove-form')"
            :disabled="isLastForm"
        >
            -
        </button>
        <button
            class="btn-text"
            @click="$emit('add-form')"
        >
            +
        </button>
    </div>
</template>

<style scoped>
.wrapper-plus-minus-btn {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.btn-text {
    background-color: #327ddf;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    width: 1.2rem;
    height: 1.2rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
}

.btn-text:disabled {
    background-color: gray !important;
    color: #ccc !important;
    cursor: not-allowed;
}
</style>
