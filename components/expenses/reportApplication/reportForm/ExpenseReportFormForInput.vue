<script setup lang="ts">
import { useDepartmentsApi } from '~/composables/api/useDepartmentsApi';
import PlusMinusBtn from '~/components/commonTools/PlusMinusBtn.vue';
import { defineProps, defineEmits } from 'vue';

const { departments, fetchDepartments } = useDepartmentsApi();

const props = defineProps({
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

onMounted(() => {
    fetchDepartments();
});

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
            <input type="date" placeholder="ex) 2025/01/01" />
        </div>
        <!-- 内容 -->
        <div class="cell description">
            <input type="text" placeholder="ex) 書籍購入費" />
        </div>
        <!-- 部門 -->
        <div class="cell department">
            <select>
                <option value="1" v-for="dept in departments">{{ dept.name }}</option>
            </select>
        </div>
        <!-- 金額 -->
        <div class="cell amount">
            <input type="number" placeholder="ex) 2,000" />
        </div>
        <!-- 支払先 -->
        <div class="cell payee">
            <input type="text" placeholder="ex) 紀伊國屋書店" />
        </div>
        <!-- 備考 -->
        <div class="cell note">
            <input type="text" />
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
