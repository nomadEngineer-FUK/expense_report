import { GET_USERS } from "~/.nuxt/imports";
import type { User } from "~/types/type";

export const useUsers = () => {
    const { $apollo } = useNuxtApp();
    const users = ref<User[]>([]);

    const fetchUsers = async () => {
        try {
            const result = await $apollo.query({
                query: GET_USERS
            });
            users.value = result.data.getUsers;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return { users, fetchUsers };
};
