<script setup lang="ts">
import ExpenseReport from '~/components/expenses/expense-reports/expense-reports-form/ExpenseReportInput.vue';
import { useUsers } from '~/composables/users';

const users = useUsers();

</script>

<template>
    <div>
        <ExpenseReport />
    </div>
</template>
