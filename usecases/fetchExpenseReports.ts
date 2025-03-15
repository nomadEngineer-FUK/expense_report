import { ExpenseReport } from "~/entities/ExpenseReport";
import { useNuxtApp } from "#app";
import { type ExpenseReportType, type DisplayedExpenseReport, DISPLAYED_COLUMNS } from "~/types/types";

// テーブルのカラム名を取得（履歴ページで表示用）
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function getColumnsFromSchema(tableName: string): Promise<string[] | null> {
    const { $supabase } = useNuxtApp();

    // Supabase のレスポンスの型
    type ColumnData = { column_name: string };

    // `rpc` の戻り値の型を正しくキャスト
    const { data, error }: PostgrestSingleResponse<ColumnData[]> = await $supabase.rpc(
        "get_column_names",
        { input_table_name: tableName },
    );

    if (error) {
        console.error("Error fetching column names:", error);
        return null;
    }

    // `data` の型チェックを厳密にする
    if (!data || !Array.isArray(data)) {
        console.error("Unexpected response format:", data);
        return null;
    }

    return data.map((col) => col.column_name);
}

/**
 * 全申請を取得
 */
export const fetchAllExpenseReports = async (): Promise<ExpenseReport[]> => {
    const { $supabase } = useNuxtApp();

    // Supabase のレスポンスの型を明示的に指定
    const { data, error }: PostgrestSingleResponse<ExpenseReport[]> = await $supabase
        .from("expense_report")
        .select();

    if (error) {
        console.error("Error fetching expense reports:", error);
        return [];
    }

    // `data` が期待通りの型であることをチェック
    if (!data || !Array.isArray(data)) {
        console.error("Unexpected response format:", data);
        return [];
    }

    return data;
};

/**
 * 全申請データから、表示用にカラムを調整
 */
export const convertToSelectedColumns = (
    data: ExpenseReportType[],
): DisplayedExpenseReport[] => data.map((item) => Object.fromEntries(
    DISPLAYED_COLUMNS.map((col) => [col, item[col]]),
) as DisplayedExpenseReport);
