<script setup>
import { REPORT_STATUS_LABEL } from '~/constants';
import StatusCardsForReport from './StatusCardsForReport.vue';
import TextBtn from '~/components/commonTools/TextBtn.vue';
import ModalWindow from '~/components/commonTools/ModalWindow.vue';

const showModal = ref(false);
const openModal = () => {
    showModal.value = true;
};
const closeModal = () => {
    showModal.value = false;
};

</script>

<template>
    <div class="report-status">
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

        <ModalWindow
                v-if="showModal"
                @closeModal="closeModal"
            />
    </div>
</template>

<style scoped>
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}
</style>
