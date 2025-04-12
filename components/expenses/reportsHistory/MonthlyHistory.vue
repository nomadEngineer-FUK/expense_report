<script setup lang="ts">
import { onMounted } from 'vue';
import { formatNumber } from '~/composables/common/useCommon';
import { useMonthlyHistory } from '~/composables/expenseReport/useMonthlyHistory';
import ToggleBtn from '~/components/commonTools/ToggleBtn.vue';
import TextBtn from '~/components/commonTools/TextBtn.vue';

const { displayData, showAllMonths, fetchAll } = useMonthlyHistory();

onMounted(fetchAll);
</script>

<template>
    <div class="monthly-history-container">
        <h2 class="title">月別申請履歴</h2>

        <div class="tools-wrapper">
            <NuxtLink to="/">
                <TextBtn
                text="Back to DashBoard"
                buttonTextColor="text-gray"
                buttonBgColor="bg-orange"
                />
            </NuxtLink>
            <div class="toggle-wrapper">
                <ToggleBtn
                :label="'全ての月を表示（申請 0 件含む）'"
                v-model="showAllMonths"
                />
            </div>
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
.tools-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
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
