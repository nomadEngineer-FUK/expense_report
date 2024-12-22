<script setup lang="ts">
import ExpenseReportFormForApplicantInfo from './ExpenseReportFormForApplicantInfo.vue';
import ExpenseReportFormForDetail from './ExpenseReportFormForDetail.vue';
import ExpenseReportFormForAdditionalItem from './ExpenseReportFormForAdditionalItem.vue';
import ExpenseReportHeader from '../ExpenseReportHeader.vue';
</script>


<template>



    <div class="input-group-wrapper">
        <ExpenseReportHeader />
        <ExpenseReportFormForApplicantInfo />
        <ExpenseReportFormForDetail />
        <ExpenseReportFormForAdditionalItem />
    </div>



</template>
