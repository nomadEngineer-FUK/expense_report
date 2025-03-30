<script setup lang="ts">
import ReportForm from './reportForm/ReportForm.vue';
import ExpenseReportHeader from './ExpenseReportHeader.vue';
</script>

<template>
    <div class="expense-report">
        <ExpenseReportHeader />
        <ReportForm />
    </div>
</template>

<style scoped>
.expense-report {
    width: 100%;
    padding: 1rem 0.4rem;
    /* background-color: aliceblue; */
}
</style>
