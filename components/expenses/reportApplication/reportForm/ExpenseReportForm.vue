<script setup lang="ts">
import ExpenseReportFormForTableHeader from './ExpenseReportFormForTableHeader.vue';
import ExpenseReportFormForInput from './ExpenseReportFormForInput.vue';
</script>


<template>
    <div class="expense-report-table">
        <ExpenseReportFormForTableHeader />
        <ExpenseReportFormForInput />
        <ExpenseReportFormForInput />
        <ExpenseReportFormForInput />
        <ExpenseReportFormForInput />
        <ExpenseReportFormForInput />
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
</style>
