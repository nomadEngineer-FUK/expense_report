import { GET_ACCOUNTING_ITEMS } from "~/apis/graphql/query/queries";

export const useAccountingItemsApi = () => {
    const { $apollo } = useNuxtApp();
    const { accountingItems, setAccountingItems } = useAccountingItemsState();

    const fetchAccountingItems = async () => {
        try {
            const result = await $apollo.query({
                query: GET_ACCOUNTING_ITEMS
            });
            setAccountingItems(result.data.getAccountingItems);
        } catch (error) {
            console.error('Error fetching accounting items:', error);
        }
    };
    return { accountingItems, fetchAccountingItems };
};
