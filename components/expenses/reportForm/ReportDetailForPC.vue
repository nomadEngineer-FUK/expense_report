<script setup lang="ts">
import { useFormsStore } from '~/composables/expenseReport/useFormsStore';
import PlusBtn from '~/components/commonTools/PlusBtn.vue';
import ReportFormForInput from './ReportFormForInput.vue';
import { formatNumber } from '~/composables/common/useCommon';
import { departmentIdToNameMap } from '~/mock/mockData';
const { forms, addFormAt, addFormToTop, removeForm } = useFormsStore();

defineProps<{
    isConfirming: boolean;
}>();

// 入力フォームが一つの場合は、フォームの削除不可
const isLastForm = computed(() => forms.value.length === 1);
</script>

<template>
    <div class="expense-report-table">
        <div
            :class="[
                'base-grid',
                'report-detail-header',
                isConfirming ? 'confirm-mode-grid' : 'edit-mode-grid',
            ]"
        >
            <PlusBtn
                v-if="!isConfirming"
                class="cell plusBtn"
                @click="addFormToTop"
            />
            <div>内容</div>
            <div>部門</div>
            <div>金額</div>
        </div>
        <div
            v-for="(form, index) in forms"
            :key="form.id"
        >
            <ReportFormForInput
                v-if="!isConfirming"
                @add-form="addFormAt(index)"
                @remove-form="removeForm"
                :form="form"
                :form-id="form.id"
                :is-last-form="isLastForm"
            />

            <!-- 確認モード用：表示専用 -->
            <div
                v-else
                class="base-grid confirm-mode-grid"
            >
                <div class="readonly-field">{{ form.description }}</div>
                <div class="readonly-field">
                    {{ departmentIdToNameMap[form.department_id] }}
                </div>
                <div class="readonly-field">
                    {{ formatNumber(form.amount) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.expense-report-table {
    border: 1px solid #ddd;
    border-radius: 8px;
}
.base-grid {
    display: grid;
    gap: 1rem;
    padding: 0.4rem 1.6rem;
    text-align: center;
    margin-bottom: 0.4rem;
    align-items: center;
}
.edit-mode-grid {
    grid-template-columns: auto 1fr 1fr 1fr;
}
.confirm-mode-grid {
    grid-template-columns: 1fr 1fr 1fr;
}
.report-detail-header {
    background-color: #f5f5f5;
    font-weight: bold;
}
</style>
