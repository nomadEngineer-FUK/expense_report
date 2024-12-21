<script setup lang="ts">
import { useUsers } from "~/composables/users";
import { onMounted } from "vue";
const { users, fetchUsers } = useUsers();

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
