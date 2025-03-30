import { useToast } from "vue-toastification";
import type { ExpenseReportType } from "~/types/types";
import { useNuxtApp } from "#app";

export const useExpensesApi = () => {
    const { $supabase } = useNuxtApp();
    const toast = useToast();

    const fetchExpenses = async (): Promise<ExpenseReportType[]> => {
        const { data, error } = await $supabase
            .from("expense_report")
            .select();

        if (error) {
            console.error("Error fetching expenses:", error);
            return [];
        }
        return (data as ExpenseReportType[]) ?? [];
    };

    const addExpense = async (
        expenses: ExpenseReportType[],
    ): Promise<boolean> => {
        try {
            // 1. 共通情報の抽出（日付と支払先）
            const commonReportInfo = {
                purchase_date: expenses[0].purchase_date,
                payee: expenses[0].payee,
                note: expenses[0].note,
            };

            // 2. 共通情報を各行にマージ（id は除外）
            const convertedExpenses = expenses.map(({ id, ...rest }) => ({
                ...rest,
                ...commonReportInfo,
            }));

            // 3. Supabaseへ登録
            const { error } = await $supabase
                .from("expense_report")
                .insert(convertedExpenses)
                .select();

            if (error) {
                console.error("Supabase Error:", error);
                toast.error("経費申請に失敗しました", { timeout: 3000 });
                return false;
            }

            toast.success("経費申請が完了しました", { timeout: 3000 });
            // console.log("申請完了");
            return true;

        } catch (err) {
            toast.error("予期しないエラーが発生しました", { timeout: 3000 });
            return false;
        }
    };

    const updateExpense = async (
        id: number,
        newExpenseData: Partial<ExpenseReportType>,
    ): Promise<boolean> => {
        const { error } = await $supabase
            .from("expense_report")
            .update(newExpenseData)
            .eq("id", id);

        if (error) {
            console.error("Error updating expense:", error);
            return false;
        }
        return true;
    };

    const deleteExpense = async (id: number): Promise<boolean> => {
        const { error } = await $supabase
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
        deleteExpense,
    };
};
