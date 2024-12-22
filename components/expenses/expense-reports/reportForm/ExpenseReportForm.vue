<script setup lang="ts">
import ExpenseReportInputForApplicantInfo from './ExpenseReportInputForApplicantInfo.vue';
import ExpenseReportInputForDetail from './ExpenseReportInputForDetail.vue';
import ExpenseReportInputForAdditionalItem from './ExpenseReportInputForAdditionalItem.vue';
import ExpenseReportHeader from '../ExpenseReportHeader.vue';
</script>


<template>



    <div class="input-group-wrapper">
        <ExpenseReportHeader />
        <ExpenseReportInputForApplicantInfo />
        <ExpenseReportInputForDetail />
        <ExpenseReportInputForAdditionalItem />
    </div>



</template>
