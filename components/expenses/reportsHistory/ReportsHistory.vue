<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DISPLAYED_COLUMNS } from '~/types/types';
import type { ExpenseReportType } from '~/types/types';
import {
    fetchExpenseReports,
    filterExpenseReports,
    sortExpenseReports
} from '~/useCases/fetchExpenseReports';
import { COLUMN_LABEL_MAP } from '~/constants';

import DropdownSelect from '~/components/commonTools/DropdownSelect.vue';

// カラム名を日本語へ変換
const mappedColumns = (col: string) => COLUMN_LABEL_MAP[col] || col;

// 表示するカラムリスト
const columnNames = ref(DISPLAYED_COLUMNS);

// 承認状況のフィルター
enum FilterType {
    All = "all",
    Approved = "approved",
    Unapproved = "unapproved",
};
const filterOptions = [
    { label: "すべて", value: FilterType.All },
    { label: "承認済", value: FilterType.Approved },
    { label: "未承認", value: FilterType.Unapproved },
];
const filterType = ref<FilterType>(filterOptions[0].value);

// ソート
enum SortType {
    Asc = "asc",
    Desc = "desc",
};
const sortOptions = [
    { label: "昇順", value: SortType.Asc },
    { label: "降順", value: SortType.Desc },
]

// ソート対象のカラム
const sortKey = ref<keyof ExpenseReportType>("id");
const sortOrder = ref<SortType>(SortType.Asc);

const sortKeyOptions = computed(() =>
    columnNames.value.map(col => ({
        label: mappedColumns(col),
        value: col,
    }))
);

// 表示データ
const allExpenseReports = ref<(ExpenseReportType & { formattedDate: string })[]>([]);

// データ取得
const processedReports = computed<(ExpenseReportType & { formattedDate: string })[]>(() => {
    const filtered = filterExpenseReports(allExpenseReports.value, filterType.value);
    return sortExpenseReports(filtered, sortKey.value, sortOrder.value);
});

onMounted(async () => {
    allExpenseReports.value = await fetchExpenseReports();
});

// 承認状況の表示フォーマット
const getApprovalStatusText = (approval: boolean) => {
    return approval ? "承認済" : "未承認";
};
const getApprovalStatusClass = (approval: boolean) => {
    return approval ? "status-approved" : "status-unapproved";
};
</script>

<template>
    <div class="history-container">
        <h2 class="history-title">経費レポート履歴</h2>

        <!-- 承認状況のプルダウン -->
        <div class="filter-container">
            <DropdownSelect label="承認状況" v-model="filterType" :options="filterOptions" />
        </div>

        <!-- ソート用のプルダウン -->
        <DropdownSelect label="ソート対象" v-model="sortKey" :options="sortKeyOptions" />
        <DropdownSelect label="並び替え" v-model="sortOrder" :options="sortOptions" />

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
                    <!-- フィルターの結果がゼロ件の場合 -->
                    <tr v-if="processedReports.length === 0">
                        <td :colspan="columnNames.length + 1" class="no-data-message">
                            該当の条件を満たすデータはありません
                        </td>
                    </tr>

                    <tr v-for="report in processedReports" :key="report.id">
                        <td v-for="col in columnNames" :key="col" :class="`col-${col}`">
                            <template v-if="col === 'approval'">
                                <span :class="getApprovalStatusClass(report.approval)">
                                    {{ getApprovalStatusText(report.approval) }}
                                </span>
                            </template>
                            <template v-else-if="col === 'amount'">
                                {{ report[col]?.toLocaleString() }} <!-- カンマ付きにする -->
                            </template>
                            <template v-else-if="col === 'create_date'">
                                {{ report.formattedDate }} <!-- 日付のフォーマットに変更 -->
                            </template>
                            <template v-else>
                                {{ report[col] }}
                            </template>
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
.filter-container {
    margin-top: 60px;
}
.table-wrapper {
    width: 90%;
    margin: 30px auto 0;
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
.col-approval,
.col-purchase_date,
.col-create_date,
.col-amount {
    width: 120px;
}
.col-receipt {
    width: 80px;
}

/* 承認済みのスタイル */
.status-approved {
    color: #2f5d3a;
    background-color: #d4edda;
    padding: 4px 8px;
    border-radius: 4px;
}

/* 未承認のスタイル */
.status-unapproved {
    color: #6c2f2f;
    background-color: #f8d7da;
    padding: 4px 8px;
    border-radius: 4px;
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
