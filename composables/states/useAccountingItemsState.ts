import type { AccountingItem } from "~/types/type";

export const useAccountingItemsState = () => {
    const accountingItems = ref<AccountingItem[]>([]);
    const setAccountingItems = (items: AccountingItem[]) => {
        accountingItems.value = items;
    }

    return { accountingItems, setAccountingItems };
};
