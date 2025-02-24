<script setup lang="ts">
import ExpenseReportForm from './reportForm/ExpenseReportForm.vue';
import ExpenseReportHeader from './ExpenseReportHeader.vue';
</script>

<template>
    <div class="expense-report">
        <ExpenseReportHeader />
        <ExpenseReportForm />
    </div>
</template>

<style scoped>
.expense-report {
    width: 100%;
    padding: 1rem 0.4rem;
    /* background-color: aliceblue; */
}
</style>
