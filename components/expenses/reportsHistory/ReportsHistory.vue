<script setup>
import { onMounted } from 'vue';
import { fetchExpenseReports } from '~/useCases/fetchExpenseReports';
import { getColumnsFromSchema } from '~/useCases/fetchExpenseReports';

getColumnsFromSchema("expense_report")
    .then(columns => {
        if (columns) {
            console.log("Columns:", columns);
        }
    });


const expenseReports = ref([]);
const columnNames = ref([]);

onMounted(async () => {
    // 経費レポートの取得
    expenseReports.value = await fetchExpenseReports();
    console.log("取得した履歴:", expenseReports.value);

    // 経費レポートのテーブルのカラム名の取得
    const columns = await getColumnsFromSchema("expense_report");
    if (columns) {
        columnNames.value = columns;
        console.log("Columns:", columnNames.value);
    }
});
</script>

<template>
    <div class="history-container">
        <h2 class="history-title">経費レポート履歴</h2>
        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th v-for="col in columnNames" :key="col">{{ col }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="report in expenseReports" :key="report.id">
                        <td v-for="col in columnNames" :key="col">
                            {{ report[col] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.history-container {
    padding: 2rem;
}

.history-title {
    text-align: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ddd;
    width: 40%;
    padding-bottom: 0.4rem;
    margin: 1rem auto 2rem;
}

.table-wrapper {
    width: 90%;
    margin: 0 auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    font-size: 16px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: left;
}

th {
    background-color: #f4f4f4;
    font-weight: bold;
}

tr:hover {
    background-color: rgba(230, 255, 132, 0.244) !important;
    transition: 0.3s;
}

tr:nth-child(even) {
    background-color: #fafafa;
}

/* レスポンシブ対応 */
@media (max-width: 600px) {
    table {
        font-size: 14px;
    }

    th,
    td {
        padding: 6px 10px;
    }
}
</style>
