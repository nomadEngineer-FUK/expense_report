<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
    options: { label: string; value: string | number }[]
    modelValue: string | number
    label?: string
    layout?: 'row' | 'column'
}>()

const emit = defineEmits(['update:modelValue'])

const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    emit('update:modelValue', target.value)
}
</script>

<template>
    <div
        class="dropdown-container"
        :class="[layout === 'row' ? 'is-row' : 'is-column']"
    >
        <label
            v-if="label"
            class="dropdown-label"
            id="dropdown-select"
        >
            {{ label }}
        </label>

        <select
            name="dropdown-select"
            id="dropdown-select"
            :value="modelValue"
            @change="handleChange"
            class="dropdown-select"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.dropdown-container {
    display: flex;
    gap: 4px;
    margin-bottom: 1rem;
    width: 100%;
}
.is-column {
    flex-direction: column;
}
.is-row {
    flex-direction: row;
}
.dropdown-label {
    font-size: 14px;
    font-weight: bold;
    margin-right: 1rem;
    flex: 0 0 auto;
    min-width: 80px;
}

.dropdown-select {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    flex: 1;
}

@media (max-width: 1023px) {
    .dropdown-container {
        margin-bottom: 0.4rem;
    }
}
</style>
