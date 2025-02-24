import { useNuxtApp } from "#app";
import { GET_USERS, GET_ACCOUNTING_ITEMS, GET_DEPARTMENTS } from "./queries";
import type { User, Department, AccountingItem } from "~/types/type";

export function useDataApi() {
    const { $apollo } = useNuxtApp();

    // ユーザー取得
    const users = useState<User[]>('users', () => []);
    const fetchUsers = async () => {
        try {
            const result = await $apollo.query({ query: GET_USERS });
            users.value = result.data.getUsers;
        } catch (err) {
            console.error("Error fetching users: ", err);
        }
    };

    // 部門取得
    const departments = useState<Department[]>('departments', () => []);
    const fetchDepartments = async () => {
        try {
            const result = await $apollo.query({ query: GET_DEPARTMENTS });
            departments.value = result.data.getDepartments;
        } catch (err) {
            console.error("Error fetching departments:", err);
        }
    };

    // 会計科目取得
    const accountingItems = useState<AccountingItem[]>('accountingItems', () => []);
    const fetchAccountingItems = async () => {
        try {
            const result = await $apollo.query({ query: GET_ACCOUNTING_ITEMS });
            accountingItems.value = result.data.getAccountingItems;
        } catch (err) {
            console.error("Error fetching accounting items:", err);
        }
    };

    return {
        users,
        departments,
        accountingItems,
        fetchUsers,
        fetchDepartments,
        fetchAccountingItems
    };
};
