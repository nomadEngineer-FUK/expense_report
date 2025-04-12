<script setup>
import MonthlyReportData from './MonthlyReportData.vue';
import ReportStatus from './reportStatus/ReportStatus.vue';
import DashboardSection from './DashboardSection.vue';
</script>

<template>
    <div class="dashboard-wrapper">
        <h2 class="dashboard-title">経費精算システム</h2>
        <!-- 申請ステータス -->
        <DashboardSection title="申請ステータス">
            <ReportStatus />
        </DashboardSection>

        <!-- 月別申請データ -->
        <DashboardSection title="月別申請データ">
            <MonthlyReportData />
        </DashboardSection>
    </div>
</template>

<style scoped>
.dashboard-wrapper {
    height: 100vh;
    padding-top: 3rem;
    background-color: #f7f9fc;
}
.dashboard-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1a2a42;
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
}

.dashboard-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: #fcb900;
    margin: 0.8rem auto 0;
    border-radius: 2px;
}
</style>
