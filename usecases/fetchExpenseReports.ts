import { ExpenseReport } from "@/entities/ExpenseReport";
import { useNuxtApp } from "#app";
import { type ExpenseReportType, type DisplayedExpenseReport, DISPLAYED_COLUMNS } from "~/types/types";

// テーブルのカラム名を取得（履歴ページで表示用）
export async function getColumnsFromSchema(tableName: string): Promise<string[] | null> {
    const { $supabase } = useNuxtApp();
    const { data, error } = await $supabase.rpc("get_column_names", { input_table_name: tableName });

    if (error || !data) {
        console.error("Error fetching column names:", error);
        return null;
    }

    return data.map((col: { column_name: string }) => col.column_name);
}

/**
 * 全申請を取得
 */
export const fetchAllExpenseReports = async (): Promise<ExpenseReport[]> => {
    const { $supabase } = useNuxtApp();

    const { data, error } = await $supabase
        .from("expense_report")
        .select();

    if (error || !data) {
        console.error("Error fetching expense reports:", error);
        return [];
    }

    return data;
};

/**
 * 全申請データから、表示用にカラムを調整
 */
export const convertToSelectedColumns = (
    data: ExpenseReportType[]
): DisplayedExpenseReport[] => {
    return data.map((item) => {
        return Object.fromEntries(
            DISPLAYED_COLUMNS.map((col) => [col, item[col]])
        ) as DisplayedExpenseReport;
    });
};
