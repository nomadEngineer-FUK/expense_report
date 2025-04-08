<script setup>
import { REPORT_STATUS_LABEL, PRIMARY_REPORT_STATUS_LABEL } from '~/constants';
import { useIsUnderBreakpoint } from '~/composables/api/supabase/common/useCommon';
import StatusCardsForReport from './StatusCardsForReport.vue';
import TextBtn from '~/components/commonTools/TextBtn.vue';
import ModalWindow from '~/components/commonTools/ModalWindow.vue';

// 端末の判定
const isMobile = useIsUnderBreakpoint(768);
const labelsInCard = computed(() => {
    return isMobile.value ? PRIMARY_REPORT_STATUS_LABEL : REPORT_STATUS_LABEL;
});

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
                v-for="(label, key) in labelsInCard"
                :key="key"
                :label="label"
                :count="count"
            />
            <TextBtn
                v-if="isMobile"
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
    justify-content: center;
}
</style>
