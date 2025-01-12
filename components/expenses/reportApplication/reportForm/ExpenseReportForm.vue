<script setup lang="ts">
import { ref } from 'vue';
import ExpenseReportFormForTableHeader from './ExpenseReportFormForTableHeader.vue';
import ExpenseReportFormForInput from './ExpenseReportFormForInput.vue';
import TextBtn from '@/components/commonTools/TextBtn.vue';



let idCounter = 1; // フォームの一意なIDを生成するカウンター
const forms = ref([{ id: idCounter++ }]);

const addForm = () => {
    forms.value.push({ id: idCounter++ });
};

const removeForm = (id: number) => {
    forms.value = forms.value.filter((form) => form.id !== id);
};


</script>


<template>
    <div class="expense-report-container">
        <div class="expense-report-table">
            <ExpenseReportFormForTableHeader />

            <div
                v-for="form in forms"
                :key="form.id"
            >
                <ExpenseReportFormForInput
                    @add-form="addForm"
                    @remove-form="removeForm"
                    :form-id="form.id"
                />
            </div>
        </div>

        <div class="expense-report-btn-container">
            <TextBtn
                text="確認する"
                button-text-color="text-white"
                button-bg-color="bg-blue"
            />
            <TextBtn
                text="キャンセル"
                button-text-color="text-black"
                button-bg-color="bg-light-gray"
                button-hover-text-color="hover-text-white"
                button-hover-bg-color="hover-bg-gray"
            />
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
