<script setup lang="ts">
defineProps<{
    modelValue: boolean;
    label?: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const handleChange = (event: Event) => {
    const target = event.target;

    if (target instanceof HTMLInputElement) {
        emit('update:modelValue', target.checked);
    }
};
</script>

<template>
    <label class="toggle-switch">
        <input
            type="checkbox"
            :checked="modelValue"
            @change="handleChange"
        />
        <span class="slider" />
        <span class="toggle-label">{{ label }}</span>
    </label>
</template>

<style scoped>
.toggle-switch {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
}

.toggle-switch input[type='checkbox'] {
    display: none;
}

.slider {
    position: relative;
    width: 40px;
    height: 22px;
    background-color: #ccc;
    border-radius: 50px;
    transition: background-color 0.3s;
}

.slider::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    top: 2px;
    left: 2px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
}

input:checked + .slider {
    background-color: #1a2a42;
}

input:checked + .slider::before {
    transform: translateX(18px);
}

.toggle-label {
    user-select: none;
}
</style>
