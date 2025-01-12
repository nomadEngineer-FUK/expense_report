<script setup lang="ts">
import PlusBtn from '~/components/commonTools/PlusBtn.vue';
import { useFormsStore } from '~/.nuxt/imports';

const { addFormToTop } = useFormsStore();

</script>

<template>
    <div class="expense-grid header">
        <PlusBtn class="cell cellone" @click="addFormToTop" />
        <div class="cell">購入日</div>
        <div class="cell">内容</div>
        <div class="cell">部門</div>
        <div class="cell">金額</div>
        <div class="cell">支払先</div>
        <div class="cell">備考</div>
    </div>
</template>
<style scoped>
.header {
    background-color: #f0f0f0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.cellone {
    display: flex;
    align-items: flex-end;
}
</style>
