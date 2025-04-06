<script setup>
import MonthlyReportData from './MonthlyReportData.vue';
import ReportStatus from './reportStatus/ReportStatus.vue';
import DashboardSection from './DashboardSection.vue';
</script>

<template>
    <div class="dashboard-wrapper">
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
    padding-top: 3rem;
}
</style>
