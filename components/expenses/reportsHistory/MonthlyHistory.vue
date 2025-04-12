<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useExpensesApi } from '~/composables/api/supabase/useExpensesApi';
import type { ExpenseReportType } from '~/types/types';
import { formatNumber } from '~/composables/common/useCommon';
import ToggleBtn from '~/components/commonTools/ToggleBtn.vue';

// データ取得
const { fetchExpenses } = useExpensesApi();
const allExpenses = ref<ExpenseReportType[]>([]);
const showAllMonths = ref(false);

// 申請実績月の最古〜最新リストを作成
const getAllYearMonthKeys = (start: Date, end: Date): string[] => {
    const keys: string[] = [];
    const date = new Date(start);
    date.setDate(1);

    while (date <= end) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        keys.push(`${year}/${month}`);
        date.setMonth(date.getMonth() + 1);
    }
    return keys;
};

// 集計
const groupedExpenses = computed(() => {
    const map = new Map<string, { count: number; total: number }>();

    for (const exp of allExpenses.value) {
        if (!exp.purchase_date) continue;
        const d = new Date(exp.purchase_date);
        const key = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(
            2,
            '0'
        )}`;

        let current = map.get(key);
        if (!current) {
            current = { count: 0, total: 0 };
            map.set(key, current);
        }
        current.count += 1;
        current.total += exp.amount ?? 0;
    }

    return map;
});

// テーブルに表示するデータ
const displayData = computed(() => {
    const today = new Date();
    const oldest = allExpenses.value.reduce((min, item) => {
        const d = new Date(item.purchase_date);
        return d < min ? d : min;
    }, today);

    const keys = showAllMonths.value
        ? getAllYearMonthKeys(oldest, today)
        : [...groupedExpenses.value.keys()];

    // 年月で降順ソート
    const sortedKeys = keys.sort((a, b) => {
        const aDate = new Date(a + '/01');
        const bDate = new Date(b + '/01');
        return bDate.getTime() - aDate.getTime();
    });

    return sortedKeys.map((key) => {
        const { count = 0, total = 0 } = groupedExpenses.value.get(key) ?? {};
        return { yearMonth: key, count, total };
    });
});

// 初期データ取得
onMounted(async () => {
    const data = await fetchExpenses();
    allExpenses.value = data;
});
</script>

<template>
    <div class="monthly-history-container">
        <h2 class="title">月別申請履歴</h2>

        <div class="toggle-wrapper">
            <ToggleBtn
            :label="'全ての月を表示（申請 0 件含む）'"
            v-model="showAllMonths"
            />
        </div>

        <table class="history-table">
            <thead>
                <tr>
                    <th>年月</th>
                    <th>件数</th>
                    <th>申請金額</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in displayData"
                    :key="item.yearMonth"
                    >
                    <td>{{ item.yearMonth.replace('/', '年') }}月</td>
                    <td>{{ item.count }} 件</td>
                    <td>¥ {{ formatNumber(item.total) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.monthly-history-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
}
.title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    color: #1a2a42;
    margin-bottom: 1rem;
}
.toggle {
    display: block;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.95rem;
}
.table-wrapper {
    overflow-x: auto;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.history-table {
    width: 100%;
    border-collapse: collapse;
}
.history-table th {
    background-color: #f4f7ff;
    padding: 1rem;
    text-align: center;
    font-weight: bold;
}
.history-table td {
    padding: 1rem;
    text-align: center;
    border-top: 1px solid #eee;
}
.history-table tbody tr:hover {
    background-color: rgba(255, 245, 157, 0.3);
}

.toggle-wrapper {
    display: flex;
    justify-content: end;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

@media (max-width: 768px) {
    .title {
        font-size: 1.4rem;
    }
    .history-table th,
    .history-table td {
        padding: 0.8rem;
        font-size: 0.9rem;
    }
}
</style>
