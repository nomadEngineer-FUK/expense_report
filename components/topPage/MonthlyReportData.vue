<script setup lang="ts">
import DropdownSelect from '../commonTools/DropdownSelect.vue';
import TextBtn from '../commonTools/TextBtn.vue';
import BasicCard from '../commonTools/BasicCard.vue';
import { useDashBoardData } from '~/composables/dashboard/useDashboardData';
import { useIsUnderBreakpoint } from '~/composables/api/supabase/common/useCommon';

const { optionsOfYearMonth } = useDashBoardData();

// 表示年月のプルダウン
const yearMonth = ref<string>(optionsOfYearMonth[0].label);

// 端末の検知
const isMobile = useIsUnderBreakpoint(768);
const layout = computed<'column' | 'row'>(() =>
    isMobile.value ? 'column' : 'row'
);
</script>

<template>
    <div
        class="monthly-report-data"
        :class="{ 'cards-for-mobile': isMobile }"
    >
        <div
            class="dropdown-title"
            :class="{ 'dropdown-for-mobile': isMobile }"
        >
            <DropdownSelect
                label="表示年月"
                v-model="yearMonth"
                :options="optionsOfYearMonth"
                :layout="layout"
            />
        </div>

        <div class="summary-card">
            <BasicCard>
                <div class="label">申請件数</div>
                <div class="value">{{ 2 }} 件</div>
            </BasicCard>
            <BasicCard>
                <div class="label">申請金額</div>
                <div class="value">¥ {{ 222 }}</div>
            </BasicCard>
        </div>

        <div class="btn-to-display-past-data">
            <TextBtn
                :text="'過去のデータを見る'"
                button-text-color="text-gray"
                button-bg-color="bg-orange"
            />
        </div>
    </div>
</template>

<style scoped>
.cards-for-mobile {
    padding: 1rem 1.6rem;
    max-width: 100%;
}
.dropdown-for-mobile {
    max-width: 80%;
    margin: 0 auto;
}
.dropdown-title {
    max-width: 600px;
    margin: 0 auto;
}
.summary-card {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1.5rem 0;
    justify-content: center;
}
.label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
}
.value {
    font-size: 1.3rem;
    font-weight: bold;
    color: #333;
}
.btn-to-display-past-data {
    text-align: center;
}
</style>
