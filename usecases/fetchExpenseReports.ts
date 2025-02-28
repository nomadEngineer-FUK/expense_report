import { useSupabaseClient } from "~/.nuxt/imports";
import { ExpenseReport } from "@/entities/ExpenseReport";


// 申請履歴を全て取得
export const fetchExpenseReports = async (): Promise<ExpenseReport[]> => {
    const supabase = useSupabaseClient();

    const { data, error } = await supabase
        .from('expense_report')
        .select();

    if (error) {
        console.error('Error fetching expense reports:', error);
        return [];
    }
    console.log('取得したデータ:', data);
    return data;
};

// テーブルのカラム名を取得（履歴ページで表示用）
export async function getColumnsFromSchema(tableName: string): Promise<string[] | null> {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase.rpc("get_column_names", { input_table_name: "expense_report" });


    if (error || !data) {
        console.error("Error fetching column names:", error);
        return null;
    }

    return data.map((col: { column_name: string }) => col.column_name);
}

