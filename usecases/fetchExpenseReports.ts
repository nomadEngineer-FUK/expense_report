import { useSupabaseClient } from "~/.nuxt/imports";
import type { ExpenseReportType } from "@/types/types";
import { ExpenseReport } from "@/entities/ExpenseReport";



export const fetchExpenseReports = async (): Promise<ExpenseReport[]> => {
    const supabase = useSupabaseClient();
    
    const { data, error } = await supabase
        .from('expense_reports')
        .select();
    
    if (error) {
        console.error('Error fetching expense reports:', error);
        return [];
    }
    console.log('取得したデータ:', data);
    return data;
};
