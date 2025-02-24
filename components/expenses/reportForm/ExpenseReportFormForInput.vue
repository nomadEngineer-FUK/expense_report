<script setup lang="ts">
import PlusMinusBtn from '~/components/commonTools/PlusMinusBtn.vue';
import { defineProps, defineEmits } from 'vue';
import { mockDepartments } from '~/mock/mockData';

const departments = ref(mockDepartments);

const props = defineProps({
    form: {
        type: Object,
        required: true
    },
    formId: {
        type: Number,
        required: true
    },
    isLastForm: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['add-form', 'remove-form']);


</script>
<template>
    <div class="expense-grid input-row">

        <PlusMinusBtn
            class="cell"
            @add-form="$emit('add-form')"
            @remove-form="$emit('remove-form', formId)"
            :is-last-form="isLastForm"
        />

        <!-- 購入日 -->
        <div class="cell">
            <input type="date" v-model="form.purchase_date" placeholder="ex) 2025/01/01" />
        </div>
        <!-- 内容 -->
        <div class="cell description">
            <input type="text" v-model="form.description" placeholder="ex) 書籍購入費" />
        </div>
        <!-- 部門 -->
        <div class="cell department">
            <select v-model="form.department_id">
                <option v-for="dept in departments" :value="dept.id" :key="dept.id">{{ dept.name }}</option>
            </select>
        </div>
        <!-- 金額 -->
        <div class="cell amount">
            <input type="number" v-model="form.amount" placeholder="ex) 2,000" />
        </div>
        <!-- 支払先 -->
        <div class="cell payee">
            <input type="text" v-model="form.payee" placeholder="ex) 紀伊國屋書店" />
        </div>
        <!-- 備考 -->
        <div class="cell note">
            <input v-model="form.note" type="text" />
        </div>
    </div>
</template>
<style scoped>
:deep(.cell input),
:deep(.cell select) {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

:deep(.cell input)::placeholder,
:deep(.cell select)::placeholder {
    font-size: 0.7rem;
}

:deep(.cell input[type="date"]) {
    font-size: 0.7rem;
}
</style>
