import type { FormType } from "~/types/type";
import { useSupabaseClient } from "./useSupabaseClient";
import { useToast } from "vue-toastification";


export function useExpensesApi() {
    const supabase = useSupabaseClient();
    const toast = useToast();

    const fetchExpenses = async () => {
        const { data, error } = await supabase
            .from("expenseRequest")
            .select();

        if (error) {
            console.error("Error fetching expenses:", error);
            return [];
        }
        return data as FormType[];
    };

    const addExpense = async (expenses: FormType[]): Promise<boolean> => {
        try {
            const convertedExpenses = expenses.map(({ id, ...rest }) => rest);
            const { error } = await supabase
                .from("expenseRequest")
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

    const updateExpense = async (id: number, updateExpense: Partial<FormType>) => {
        const { error } = await supabase
            .from("expenseRequest")
            .update(updateExpense)
            .eq("id", id);

        if (error) console.error("Error updating expense:", error);
    };

    const deleteExpense = async (id: number) => {
        const { error } = await supabase
            .from("expenseRequest")
            .delete()
            .eq("id", id);

        if (error) console.error("Error deleting expense:", error);
    };
    return {
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense
    };
};
