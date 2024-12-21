import { GET_ACCOUNTING_ITEMS } from "~/apis/graphql/query/queries";
import type { AccountingItem } from "~/types/type";

export const useAccountingItems = () => {
    const { $apollo } = useNuxtApp();
    const accountingItems = ref<AccountingItem[]>([]);

    const fetchAccountingItems = async () => {
        try {
            const result = await $apollo.query({
                query: GET_ACCOUNTING_ITEMS
            });
            accountingItems.value = result.data.getAccountingItems;
        } catch (error) {
            console.error('Error fetching accounting items:', error);
        }
    }

    return { accountingItems, fetchAccountingItems };
};
