<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
    isLastForm: {
        type: Boolean,
        required: true
    }
});

</script>

<template>
    <div class="wrapper-plus-minus-btn">
        <div class="btn-minus">
            <button
                class="btn-text"
                @click="$emit('remove-form')"
                :disabled="isLastForm"
            >
                -
            </button>
        </div>
        <div class="btn-puls">
            <button class="btn-text" @click="$emit('add-form')">
                +
            </button>
        </div>
    </div>
</template>

<style scoped>
.btn-puls,
.btn-minus {
    background-color: #327ddf;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    text-align: center;
    justify-content: center;
    display: flex;
    border: none;
}
.btn-minus {
    margin-bottom: 0.3rem;
}

.btn-text {
    color: aliceblue;
    font-weight: bold;
    font-size: 1rem;
}

button {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
button[disabled] {
    background-color: gray;
    cursor: not-allowed;
}
</style>
