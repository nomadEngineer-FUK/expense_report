<script setup lang="ts">
import { mockUsers } from "~/mock/mockData";


</script>

<template>
    <div>
        <h2>ユーザー一覧(GraphQL)</h2>
        <ul>
            <li v-for="user in mockUsers" :key="user.id">
                {{ user.username }} ({{ user.role }})
            </li>
        </ul>
    </div>
</template>
