import type { ExpenseReportType } from "~/types/types";
import { ref, computed } from "vue";
import { useExpensesApi } from "../api/supabase/useExpensesApi";

export const useMonthlyHistory = () => {
    const { fetchExpenses } = useExpensesApi();
    const allExpenses = ref<ExpenseReportType[]>([]);
    const showAllMonths = ref(false);

    const getAllYearMonthKeys = (start: Date, end: Date): string[] => {
        const keys: string[] = [];
        const date = new Date(start);
        date.setDate(1);
        while (date <= end) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            keys.push(`${year}/${month}`);
            date.setMonth(date.getMonth() + 1);
        }
        return keys;
    };

    const groupedExpenses = computed(() => {
        const map = new Map<string, { count: number, total: number }>();

        allExpenses.value.forEach((exp) => {
            if (!exp.purchase_date) return;

            const d = new Date(exp.purchase_date);
            const key = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}`;

            let current = map.get(key);
            if (!current) {
                current = { count: 0, total: 0 }
                map.set(key, current);
            }
            current.count += 1;
            current.total += exp.amount ?? 0;
        })
        return map;
    });


    const displayData = computed(() => {
        const today = new Date();
        const oldest = allExpenses.value.reduce((min, item) => {
            const d = new Date(item.purchase_date);
            return d < min ? d : min;
        }, today);

        const keys = showAllMonths.value
            ? getAllYearMonthKeys(oldest, today)
            : [...groupedExpenses.value.keys()];

        const sortedKeys = keys.sort(
            (a, b) => new Date(`${b}/01`).getTime() - new Date(`${a}/01`).getTime()
        );

        return sortedKeys.map((key) => {
            const { count = 0, total = 0 } = groupedExpenses.value.get(key) ?? {};
            return { yearMonth: key, count, total };
        });
    });

    const fetchAll = async () => {
        allExpenses.value = await fetchExpenses();
    };

    return {
        displayData,
        showAllMonths,
        fetchAll,
    };
};
