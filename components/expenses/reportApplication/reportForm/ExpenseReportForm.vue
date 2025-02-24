<script setup lang="ts">
import ExpenseReportFormForTableHeader from './ExpenseReportFormForTableHeader.vue';
import ExpenseReportFormForInput from './ExpenseReportFormForInput.vue';
import TextBtn from '@/components/commonTools/TextBtn.vue';
import { useFormsStore } from '~/composables/ExpenseReport/useFormsStore';

const { forms, addFormAt, createNewForm, removeForm } = useFormsStore();
const { addExpense } = useExpensesApi();
const handleSubmit = async () => {
    console.log("🚀 handleSubmit() 実行開始！");
    const isSuccess = await addExpense(forms.value);
    if (isSuccess) forms.value = [createNewForm()];
};

// 入力フォームが一つの場合は、フォームの削除を出来なくする
const isLastForm = computed(() => forms.value.length === 1);
</script>

<template>
    <div class="expense-report-container">
        <div class="expense-report-table">
            <ExpenseReportFormForTableHeader />

            <div v-for="(form, index) in forms" :key="form.id">
                <ExpenseReportFormForInput
                    @add-form="addFormAt(index)"
                    @remove-form="removeForm"
                    :form="form"
                    :form-id="form.id"
                    :is-last-form="isLastForm"
                />
            </div>
        </div>

        <div class="expense-report-btn-container">
            <TextBtn text="確認する" button-text-color="text-white" button-bg-color="bg-blue" @click="handleSubmit()" />

            <TextBtn text="キャンセル" button-text-color="text-black" button-bg-color="bg-light-gray"
                button-hover-text-color="hover-text-white" button-hover-bg-color="hover-bg-gray" />
        </div>
    </div>
</template>

<style scoped>
.expense-report-table {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
}

/* Header & Input 共通のセルスタイル */
:deep(.input-row) {
    border-bottom: 1px solid #ddd;
}

:deep(.input-row):last-child {
    border-bottom: none;
}

:deep(.expense-grid .cell) {
    width: 100%;
    height: 100%;
    font-size: 0.8rem;
    padding: 0.5rem;
    text-align: center;
}

:deep(.header .cell) {
    font-weight: bold;
    color: #333;
}

.expense-report-btn-container {
    gap: 1rem;
    display: flex;
    margin-top: 1.2rem;
    justify-content: flex-end;
}
</style>
