<script setup lang="ts">

import ExpenseReportForm from '~/components/expenses/reportApplication/reportForm/ExpenseReportForm.vue';
import { useUsers } from '~/composables/users';

const users = useUsers();

</script>

<template>
    <div>
        <ExpenseReportForm />
    </div>
</template>
