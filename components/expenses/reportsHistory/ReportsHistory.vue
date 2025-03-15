<script setup>
import { onMounted } from 'vue';
import {
    fetchAllExpenseReports,
    getColumnsFromSchema,
    convertToSelectedColumns
} from '~/useCases/fetchExpenseReports';
import { DISPLAYED_COLUMNS } from '~/types/types';
import { COLUMN_LABEL_MAP } from '~/constants.ts';

getColumnsFromSchema("expense_report")
    .then(columns => {
        if (columns) {
            console.log("Columns:", columns);
        }
    });

// カラム名を日本語へ変換
const mappedColumns = (col) => COLUMN_LABEL_MAP[col] || col;

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
                        <th v-for="col in columnNames" :key="col" :class="`col-${col}`">
                            {{ mappedColumns(col) }}
                        </th>
                        <th class="col-receipt">領収証</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="report in expenseReports" :key="report.id">
                        <td v-for="col in columnNames" :key="col" :class="`col-${col}`">
                            {{ report[col] }}
                        </td>
                        <td class="col-receipt">link</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.history-container {
    padding: 2rem;
    position: relative;
    height: 100vh;
}

.history-title {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: white;
    text-align: center;
    border-bottom: 1px solid #ddd;
    padding: 1rem 0 3rem;
    z-index: 50;
}

.table-wrapper {
    width: 90%;
    margin: 50px auto 0;
    overflow-y: auto;
    max-height: calc(100vh - 100px);
}

table {
    width: 100%;
    border-collapse: collapse;
}
thead {
    position: sticky;
    top: 0;
    background: #f4f4f4;
    z-index: 40;
    border-bottom: 2px solid #ddd;
    
}

/* スクロール時の視認性を向上 */
thead::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #ddd;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: center;
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

/* カラム別の列幅 */
.col-purchase_date,
.col-amount {
    width: 120px;
}
.col-receipt {
    width: 80px;
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
