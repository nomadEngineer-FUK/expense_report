<script setup lang="ts">
import TextBtn from '~/components/commonTools/TextBtn.vue';
import { useFormsStore } from '~/composables/ExpenseReport/useFormsStore';
import { mockDepartments, departmentIdToNameMap } from '~/mock/mockData';

const { forms, addFormAt, removeForm } = useFormsStore();

defineProps<{
    isConfirming: boolean;
}>();

// 入力フォームが一つの場合は、フォームの削除不可
const isLastForm = computed(() => forms.value.length === 1);
</script>
<template>
    <div
        v-for="(form, index) in forms"
        :key="form.id"
        class="mobile-input-card"
    >
        <!-- 確認モード -->
        <template v-if="isConfirming">
            <div class="mobile-input-row">
                <label>内容</label>
                <div class="readonly-field">{{ form.description }}</div>
            </div>
            <div class="mobile-input-row">
                <label>部門</label>
                <div class="readonly-field">
                    {{ departmentIdToNameMap[form.department_id] }}
                </div>
            </div>
            <div class="mobile-input-row">
                <label>金額</label>
                <div class="readonly-field">{{ form.amount }}</div>
            </div>
        </template>

        <!-- 編集モード -->
        <template v-else>
            <div class="mobile-input-row">
                <label>内容</label>
                <input
                    v-model="form.description"
                    type="text"
                />
            </div>
            <div class="mobile-input-row">
                <label>部門</label>
                <select v-model="form.department_id">
                    <option
                        v-for="dept in mockDepartments"
                        :key="dept.id"
                        :value="dept.id"
                    >
                        {{ dept.name }}
                    </option>
                </select>
            </div>
            <div class="mobile-input-row">
                <label>金額</label>
                <input
                    v-model="form.amount"
                    type="number"
                />
            </div>
            <div class="mobile-input-actions">
                <TextBtn
                    v-if="!isConfirming"
                    text="下に追加"
                    class="report-btn"
                    button-text-color="text-white"
                    button-bg-color="bg-blue"
                    @click="addFormAt(index)"
                />
                <TextBtn
                    v-show="!isLastForm"
                    v-if="!isConfirming"
                    text="削除"
                    class="report-btn"
                    button-text-color="text-white"
                    button-bg-color="bg-gray"
                    button-hover-text-color="hover-text-white"
                    button-hover-bg-color="hover-bg-gray"
                    @click="removeForm(form.id)"
                />
            </div>
        </template>
    </div>
</template>

<style scoped>
.expense-report-mobile {
    width: 90%;
    margin: 0 auto;
}
.mobile-input-card {
    background-color: #fafafa;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}
.mobile-input-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
}
.mobile-input-row label {
    font-weight: bold;
    width: 4rem;
    text-align: center;
    margin-right: 1rem;
}
.mobile-input-row input,
.mobile-input-row select {
    flex: 1;
    padding: 0.4rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.4rem;
    min-width: 200px;
}
.mobile-input-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}
.report-btn:disabled {
    background-color: gray;
    color: #ccc;
    cursor: not-allowed;
}
</style>
