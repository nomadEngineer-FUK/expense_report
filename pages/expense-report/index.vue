<script setup lang="ts">
import ExpenseReport from '~/components/expenses/ExpenseReport.vue';
import DisplayReceipt from '~/components/expenses/pictureOfReceipt/DisplayReceipt.vue';
</script>

<template>
    <div class="expense-report-container">
        <div class="expense-form-wrapper">
            <ExpenseReport />
        </div>
        <div class="receipt-wrapper">
            <DisplayReceipt />
        </div>
    </div>
</template>

<style scoped>
.expense-report-container {
    display: flex;
    gap: 1rem;
    padding: 0.8rem;
}

.expense-form-wrapper {
    flex: 0 0 67%;
}

.receipt-wrapper {
    flex: 0 0 33%;
}
</style>