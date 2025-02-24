<script setup lang="ts">
import { onMounted } from "vue";

const { users, fetchUsers } = useDataApi();

onMounted(() => {
    fetchUsers();
});
</script>

<template>
    <div>
        <h2>ユーザー一覧(GraphQL)</h2>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.username }} ({{ user.role }})
            </li>
        </ul>
    </div>
</template>
