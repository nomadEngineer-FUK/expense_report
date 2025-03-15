<script setup>
import { onMounted } from 'vue';
import {
    fetchAllExpenseReports,
    getColumnsFromSchema,
    convertToSelectedColumns
} from '~/useCases/fetchExpenseReports';
import { DISPLAYED_COLUMNS } from '~/types/types';


getColumnsFromSchema("expense_report")
    .then(columns => {
        if (columns) {
            console.log("Columns:", columns);
        }
    });

// 経費申請データ
const expenseReports = ref([]);
// カラム
const columnNames = ref(DISPLAYED_COLUMNS);

onMounted(async () => {
    // 経費レポートの取得
    const allData = await fetchAllExpenseReports();
    expenseReports.value = convertToSelectedColumns(allData);
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
    background-color: rgba(255, 245, 157, 0.3) !important;
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
