import { GET_USERS } from "~/apis/graphql/query/queries";

export const useUsersApi = () => {
    const { $apollo } = useNuxtApp();
    const { users, setUsers } = useUsersState();

    const fetchUsers = async () => {
        try {
            const result = await $apollo.query({
                query: GET_USERS
            });
            setUsers(result.data.getUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    return { users, fetchUsers };
};
