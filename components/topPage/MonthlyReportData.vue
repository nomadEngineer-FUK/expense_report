<script setup lang="ts">
import DropdownSelect from '../commonTools/DropdownSelect.vue';
import TextBtn from '../commonTools/TextBtn.vue';
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
    <div class="dashboard-wrapper" :class="{'cards-for-mobile': isMobile}">
        <div class="dropdown-area">
            <DropdownSelect
                label="表示年月"
                v-model="yearMonth"
                :options="optionsOfYearMonth"
                :layout="layout"
            />
        </div>

        <div class="summary-block">
            <div class="summary-item">
                <span class="label">申請件数</span>
                <span class="value">{{ 2 }} 件</span>
            </div>
            <div class="summary-item">
                <span class="label">申請金額</span>
                <span class="value">¥ {{ 222 }}</span>
            </div>
        </div>

        <div>
            <TextBtn
                :text="'過去のデータを見る'"
                button-text-color="text-gray"
                button-bg-color="bg-orange"
            />
        </div>
    </div>
</template>

<style scoped>
.dashboard-wrapper {
    max-width: 80%;
    background-color: #fafafa;
    margin: 0 auto;
    padding: 1rem 3rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.cards-for-mobile {
    padding:1rem 1.6rem;
}

.summary-block {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1.5rem 0;
}

.summary-item {
    flex: 1 1 160px;
    background: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 auto;
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
</style>
