<script setup lang="ts">
import BasicCard from '~/components/commonTools/BasicCard.vue';
import { formatNumber } from '~/composables/common/useCommon';

const props = defineProps<{
    label: string,
    count: number,
}>();
</script>
<template>
    <BasicCard>
        <div class="label">{{ label }}</div>
        <div class="count">{{ formatNumber(count) }} 件</div>
    </BasicCard>
</template>

<style scoped>
.status-card:hover {
    background-color: aliceblue;
}
.label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
}
.count {
    font-size: 1.3rem;
    font-weight: bold;
    color: #333;
}
</style>
