<script setup>
import { onMounted } from 'vue';
import { fetchExpenseReports } from '~/usecases/fetchExpenseReports';

const expenseReports = ref([]);
onMounted(async () => {
    expenseReports.value = await fetchExpenseReports();
    console.log("取得したデータ:", expenseReports);
});
</script>

<template>
    <div>
        <h2>経費レポート履歴</h2>
        <ul>
            <li v-for="report in expenseReports" :key="report.id">
                {{ report.getFormattedAmount() }} - {{ report.getFormattedDate() }}
            </li>
        </ul>
    </div>
</template>
