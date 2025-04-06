<script setup>
import StatusCardsForReport from './StatusCardsForReport.vue'
import MonthlyReportData from './MonthlyReportData.vue'
import { REPORT_STATUS_LABEL } from '~/constants'
import ModalWindow from '../commonTools/ModalWindow.vue'
import TextBtn from '../commonTools/TextBtn.vue'

const count = ref(3)

const showModal = ref(false)
const openModal = () => {
    showModal.value = true
}
const closeModal = () => {
    showModal.value = false
}
</script>

<template>
    <div class="dashboard-wrapper">
        <div class="dashboard-section">
            <h3 class="section-title">申請ステータス</h3>
            <div class="card-container">
                <StatusCardsForReport
                    v-for="(label, key) in REPORT_STATUS_LABEL"
                    :key="key"
                    :label="label"
                    :count="count"
                />
                <TextBtn
                    text="その他ステータス"
                    class="report-btn"
                    button-text-color="text-white"
                    button-bg-color="bg-gray"
                    @click="openModal"
                />
            </div>
        </div>

        <div class="dashboard-section">
            <h3 class="section-title">月別申請データ</h3>
            <MonthlyReportData
                :count="2"
                :amount="1234"
            />
        </div>
        <div>
            <ModalWindow
                v-if="showModal"
                @closeModal="closeModal"
            />
        </div>
    </div>
</template>

<style scoped>
.dashboard-wrapper {
    /* background-color: beige; */
    padding-top: 3rem;
}
.dashboard-section {
    width: 80%;
    /* background-color: aquamarine; */
    margin: 0 auto;
    padding: 1rem;
}
.section-title {
    margin-bottom: 1rem;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}
</style>
