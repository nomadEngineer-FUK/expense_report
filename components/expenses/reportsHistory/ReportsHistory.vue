<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DISPLAYED_COLUMNS } from '~/types/types';
import type { ExpenseReportType } from '~/types/types';
import {
    FilterType,
    SortType,
    filterOptions,
    sortOptions,
} from '~/types/types';
import {
    fetchExpenseReports,
    filterExpenseReports,
    sortExpenseReports,
} from '~/useCases/fetchExpenseReports';
import { COLUMN_LABEL_MAP } from '~/constants';
import { useIsUnderBreakpoint } from '~/composables/api/supabase/common/useCommon';
import { formatNumber } from '~/composables/common/useCommon';
import DropdownSelect from '~/components/commonTools/DropdownSelect.vue';
import { useMonthlyHistory } from '../../../composables/expenseReport/useMonthlyHistory';

// カラム名を日本語へ変換
const mappedColumns = (col: string) => COLUMN_LABEL_MAP[col] || col;

// 表示するカラムリスト
const columnNames = ref(DISPLAYED_COLUMNS);

// フィルター対象のカラム
const filterType = ref<FilterType>(filterOptions[0].value);

// ソート対象のカラム
const sortKey = ref<keyof ExpenseReportType>('id');
const sortOrder = ref<SortType>(SortType.Asc);

const sortKeyOptions = computed(() =>
    columnNames.value.map((col) => ({
        label: mappedColumns(col),
        value: col,
    }))
);

// 表示データ
const allExpenseReports = ref<
    (ExpenseReportType & { formattedDate: string })[]
>([]);

// データ取得
const processedReports = computed<
    (ExpenseReportType & { formattedDate: string })[]
>(() => {
    const filtered = filterExpenseReports(
        allExpenseReports.value,
        filterType.value
    );
    return sortExpenseReports(filtered, sortKey.value, sortOrder.value);
});

onMounted(async () => {
    await fetchAll();
    allExpenseReports.value = await fetchExpenseReports();
});

// 承認状況の表示フォーマット
const getApprovalStatusText = (approval: boolean) => {
    return approval ? '承認済' : '未承認';
};
const getApprovalStatusClass = (approval: boolean) => {
    return approval ? 'status-approved' : 'status-unapproved';
};

// 端末の検知
const isTablet = useIsUnderBreakpoint(1023);
const layout = computed<'row' | 'column'>(() =>
    isTablet.value ? 'row' : 'column'
);

// 月別申請データ
const { displayData, fetchAll } = useMonthlyHistory();
const optionsForMonthlyData = computed(() =>
    displayData.value.map((item) => ({
        label: `${item.yearMonth.replace('/', '年')}月（${item.count}件）`,
        value: item.yearMonth,
    }))
);
const selectedYearMonth = ref<string>('');
</script>

<template>
    <div class="history-container">
        <h2 class="history-title">経費レポート履歴</h2>

        <div class="history-content">
            <!-- 承認状況のプルダウン -->
            <div class="dropdown-wrapper">
                <!-- フィルター用のプルダウン -->
                <DropdownSelect
                    label="承認状況"
                    v-model="filterType"
                    :options="filterOptions"
                    :layout="layout"
                />

                <!-- ソート用のプルダウン -->
                <DropdownSelect
                    label="ソート対象"
                    v-model="sortKey"
                    :options="sortKeyOptions"
                    :layout="layout"
                />
                <DropdownSelect
                    label="並び替え"
                    v-model="sortOrder"
                    :options="sortOptions"
                    :layout="layout"
                />
                <DropdownSelect
                    label="月別実績"
                    v-model="selectedYearMonth"
                    :options="optionsForMonthlyData"
                    :layout="layout"
                />
            </div>

            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th
                                v-for="col in columnNames"
                                :key="col"
                                :class="`col-${col}`"
                            >
                                {{ mappedColumns(col) }}
                            </th>
                            <th class="col-receipt">領収証</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- フィルターの結果がゼロ件の場合 -->
                        <tr v-if="processedReports.length === 0">
                            <td
                                :colspan="columnNames.length + 1"
                                class="no-data-message"
                            >
                                該当の条件を満たすデータはありません
                            </td>
                        </tr>

                        <tr
                            v-for="report in processedReports"
                            :key="report.id"
                        >
                            <td
                                v-for="col in columnNames"
                                :key="col"
                                :class="`col-${col}`"
                            >
                                <template v-if="col === 'approval'">
                                    <span
                                        :class="
                                            getApprovalStatusClass(
                                                report.approval
                                            )
                                        "
                                    >
                                        {{
                                            getApprovalStatusText(
                                                report.approval
                                            )
                                        }}
                                    </span>
                                </template>
                                <template v-else-if="col === 'amount'">
                                    {{ formatNumber(report[col]) }}
                                </template>
                                <template v-else-if="col === 'create_date'">
                                    {{ report.formattedDate }}
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
    </div>
</template>

<style scoped>
.history-container {
    padding: 2rem;
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.history-title {
    position: fixed;
    top: 0;
    left: 12%;
    width: calc(100% - 12%);
    height: 50px;
    background: white;
    /* text-align: center; */
    border-bottom: 1px solid #ddd;
    padding: 2rem 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}
.history-content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    margin-top: 50px;
}
.dropdown-wrapper {
    width: 180px;
    flex-shrink: 0;
    margin-top: 20px;
}

/* テーブル */
.table-wrapper {
    width: 90%;
    margin: 20px auto 0;
    overflow-y: auto;
    max-height: calc(100vh - 150px);
    flex-grow: 1;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
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
    content: '';
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

/* 承認済み・未承認 */
.status-approved {
    color: #2f5d3a;
    background-color: #d4edda;
    padding: 4px 8px;
    border-radius: 4px;
}
.status-unapproved {
    color: #6c2f2f;
    background-color: #f8d7da;
    padding: 4px 8px;
    border-radius: 4px;
}

/* レスポンシブ対応 */
@media (max-width: 1023px) {
    .history-container {
        overflow: hidden;
    }

    .history-title {
        left: 0;
        width: 100%;
        font-size: 1.2rem;
        padding: 1rem 0;
        flex-direction: column;
    }

    .history-content {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .dropdown-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .table-wrapper {
        width: 100%;
        max-height: calc(100vh - 350px);
        overflow-x: auto;
        overflow-y: auto;
        padding-bottom: 20px;
        margin-top: 5px;
        display: block;
        white-space: nowrap;
    }

    table {
        width: 800px;
    }

    th,
    td {
        padding: 5px 8px;
        font-size: 12px;
    }

    .col-approval,
    .col-purchase_date,
    .col-create_date,
    .col-amount {
        width: auto;
    }
}
</style>
