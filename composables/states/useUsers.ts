import type { User } from "~/types/type";
import { ref } from "vue";
export const useUsersState = () => {
    const users = ref<User[]>([]);
    const setUsers = (items: User[]) => {
        users.value = items;
    };
    return { users, setUsers };
};
