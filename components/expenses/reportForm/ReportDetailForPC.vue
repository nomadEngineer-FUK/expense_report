<script setup>
import { useFormsStore } from '~/composables/ExpenseReport/useFormsStore';
import PlusBtn from '~/components/commonTools/PlusBtn.vue';
import ReportFormForInput from './ReportFormForInput.vue';

const { forms, addFormAt, addFormToTop, removeForm } = useFormsStore()

// 入力フォームが一つの場合は、フォームの削除不可
const isLastForm = computed(() => forms.value.length === 1)
</script>

<template>
    <div class="expense-report-table">
        <div class="report-grid report-detail-header">
            <PlusBtn
                class="cell plusBtn"
                @click="addFormToTop"
            />
            <div class="cell">内容</div>
            <div class="cell">部門</div>
            <div class="cell">金額</div>
        </div>
        <div
            v-for="(form, index) in forms"
            :key="form.id"
        >
            <ReportFormForInput
                @add-form="addFormAt(index)"
                @remove-form="removeForm"
                :form="form"
                :form-id="form.id"
                :is-last-form="isLastForm"
            />
        </div>
    </div>
</template>

<style scoped>
.expense-report-table {
    border: 1px solid #ddd;
    border-radius: 8px;
}
.report-detail-header {
    background-color: #f0f0f0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}
.report-detail-header {
    display: grid;
    grid-template-columns: auto 1fr 1fr 1fr;
    gap: 1rem;
    padding: 0.4rem 1.6rem;
    background-color: #f5f5f5;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.4rem;
}
</style>
