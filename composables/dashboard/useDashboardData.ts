import type { ExpenseReportType } from "~/types/types";
import { useExpensesApi } from "../api/supabase/useExpensesApi";

export const useDashBoardData = () => {

    // 表示年月選択のプルダウン
    // 一旦、2年分（最終的には、その人の入社年月を考慮できると良い）
    const lengthOfMonth = 24;
    const now = new Date();

    const optionsOfYearMonth = Array.from({ length: lengthOfMonth }).map((_, i) => {
        const date = new Date(now.getFullYear(), now.getMonth(), 1);
        date.setMonth(date.getMonth() - i);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const paddedMonth = String(month).padStart(2, "0");

        return {
            label: `${year}年${month}月`,
            value: `${year}/${paddedMonth}`
        };
    });

    const { fetchExpenses } = useExpensesApi();
    const allExpenses = ref<ExpenseReportType[]>([]);
    const selectedYearMonth = ref<string>("");
    selectedYearMonth.value = optionsOfYearMonth[0].value;

    const fetchAll = async (): Promise<void> => {
        const data = await fetchExpenses();
        allExpenses.value = data;
    };

    const filteredExpenses = computed<ExpenseReportType[]>(() => {

        const expenses = allExpenses.value ?? [];
        if (!selectedYearMonth.value) {
            return expenses as ExpenseReportType[];
        }

        return expenses.filter((item: ExpenseReportType) => {
            if (!item.purchase_date) return false;

            const date = new Date(item.purchase_date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const yearMonth = `${year}/${month}`;

            return yearMonth === selectedYearMonth.value;
        }) as ExpenseReportType[];
    });

    return {
        selectedYearMonth,
        optionsOfYearMonth,
        filteredExpenses,
        fetchAll
    }
};
