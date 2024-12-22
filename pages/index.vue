<script setup lang="ts">
import GqlTest from '~/components/users/GqlTest.vue';
</script>

<template>
    <div>
        <p>this is home page</p>
        <NuxtLink to="/expense-report">REPORT</NuxtLink>

        <GqlTest />
    </div>
</template>
