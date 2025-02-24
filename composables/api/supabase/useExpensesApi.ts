import type { ExpenseReportType } from "~/types/types";
import { useSupabaseClient } from "./useSupabaseClient";
import { useToast } from "vue-toastification";


export function useExpensesApi() {
    const supabase = useSupabaseClient();
    const toast = useToast();

    const fetchExpenses = async (): Promise<ExpenseReportType[]> => {
        const { data, error } = await supabase
            .from("expense_report")
            .select();

        if (error) {
            console.error("Error fetching expenses:", error);
            return [];
        }
        return data ?? [];
    };

    const addExpense = async (expenses: ExpenseReportType[]): Promise<boolean> => {
        try {
            const convertedExpenses = expenses.map(({ id, ...rest }) => rest);
            const { error } = await supabase
                .from("expense_report")
                .insert(convertedExpenses)
                .select();

            if (error) {
                console.error("Supabase Error:", error);
                toast.error("経費申請に失敗しました", { timeout: 3000 });
                return false;
            }
            toast.success("経費申請が完了しました", { timeout: 3000 });
            console.log("申請完了")

            return true;

        } catch (err) {
            toast.error("予期しないエラーが発生しました", { timeout: 3000 });
            return false;
        }
    };

    const updateExpense = async (id: number, updateExpense: Partial<ExpenseReportType>): Promise<boolean> => {
        const { error } = await supabase
            .from("expense_report")
            .update(updateExpense)
            .eq("id", id);

        if (error) {
            console.error("Error updating expense:", error);
            return false;
        }
        return true;
    };

    const deleteExpense = async (id: number): Promise<boolean> => {
        const { error } = await supabase
            .from("expense_report")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting expense:", error);
            return false;
        }
        return true;
    };

    return {
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense
    };
};
