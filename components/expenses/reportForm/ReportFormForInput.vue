<script setup lang="ts">
import PlusMinusBtn from '~/components/commonTools/PlusMinusBtn.vue';
import { defineProps, defineEmits } from 'vue';
import { mockDepartments } from '~/mock/mockData';
import type { ExpenseForm } from '~/types/types';

const departments = ref(mockDepartments);

const props = defineProps<{
    form: ExpenseForm
    formId: number
    isLastForm: boolean
}>();

const emit = defineEmits(['add-form', 'remove-form']);
</script>

<template>
    <div class="input-card">
        <div class="input-grid">
            <div class="plus-minus-wrapper">
                <PlusMinusBtn
                    @add-form="$emit('add-form')"
                    @remove-form="$emit('remove-form', formId)"
                    :is-last-form="isLastForm"
                />
            </div>

            <!-- 内容 -->
            <div class="input-field">
                <input
                    type="text"
                    v-model="form.description"
                    placeholder="ex) 書籍購入費"
                />
            </div>

            <!-- 部門 -->
            <div class="input-field">
                <select v-model="form.department_id">
                    <option
                        v-for="dept in departments"
                        :value="dept.id"
                        :key="dept.id"
                    >
                        {{ dept.name }}
                    </option>
                </select>
            </div>

            <!-- 金額 -->
            <div class="input-field">
                <input
                    type="number"
                    v-model="form.amount"
                    placeholder="ex) 2,000"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.input-card {
    background-color: white;
    border-radius: 1rem;
    padding: 0.8rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 1rem;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    overflow-x: auto;
}

.input-grid {
    display: grid;
    grid-template-columns: auto 1fr 1fr 1fr;
    gap: 1rem;
    align-items: end;
}

.plus-minus-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-field {
    display: flex;
    flex-direction: column;
}

.input-field label {
    font-weight: 500;
    margin-bottom: 0.3rem;
    color: #333;
    font-size: 0.85rem;
}

.input-field input,
.input-field select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    background-color: #fff;
}

.input-field input:hover,
.input-field select:hover {
    border-color: #888;
}

.input-field input::placeholder {
    color: #aaa;
}
</style>
