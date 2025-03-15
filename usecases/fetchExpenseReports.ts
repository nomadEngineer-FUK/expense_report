import { useNuxtApp } from "#app";
import { type ExpenseReportType } from "~/types/types";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

/**
 * 経費申請の全件取得
 */
export const fetchAllExpenseReports = async (): Promise<ExpenseReportType[]> => {
    const { $supabase } = useNuxtApp();

    const { data, error }: PostgrestSingleResponse<ExpenseReportType[]> = await $supabase
        .from("expense_report")
        .select();

    if (error || !Array.isArray(data)) {
        console.error("Error fetching expense reports:", error);
        return [];
    }

    return data;
};

/**
 * 経費申請のフィルター
 */
export const filterExpenseReports = (
    data: ExpenseReportType[],
    filterType: "all" | "approved" | "unapproved",
): ExpenseReportType[] => {
    switch (filterType) {
        case "unapproved":
            return data.filter((report) => !report.approval);
        case "approved":
            return data.filter((report) => report.approval);
        default:
            return data;
    }
};

// ソート
export const sortExpenseReports = (
    data: ExpenseReportType[],
    sortKey: keyof ExpenseReportType | null,
    sortOrder: "asc" | "desc",
): ExpenseReportType[] => {
    if (!sortKey) return [...data];

    return [...data].sort((a, b) => {
        const valueA = a[sortKey] ?? "";
        const valueB = b[sortKey] ?? "";

        // 空白データ（null / undefined含む）を最後に表示
        const isEmptyA = valueA === "" || Number.isNaN(valueA);
        const isEmptyB = valueB === "" || Number.isNaN(valueB);

        if (isEmptyA && !isEmptyB) return 1; // Aが空なら後ろに
        if (!isEmptyA && isEmptyB) return -1; // Bが空なら後ろに
        if (isEmptyA && isEmptyB) return 0; // 両方空ならそのまま

        // boolean（承認状況） のソート
        if (sortKey === "approval") {
            return sortOrder === "asc"
                ? Number(valueA) - Number(valueB) // `false (0)` → `true (1)`
                : Number(valueB) - Number(valueA); // `true (1)` → `false (0)`
        }

        // 日付のソート
        if (sortKey === "purchase_date" || sortKey === "create_date") {
            return sortOrder === "asc"
                ? new Date(valueA as string).getTime() - new Date(valueB as string).getTime()
                : new Date(valueB as string).getTime() - new Date(valueA as string).getTime();
        }

        // 数値のソート
        if (typeof valueA === "number" && typeof valueB === "number") {
            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        }

        // 文字列のソート
        if (typeof valueA === "string" && typeof valueB === "string") {
            return sortOrder === "asc"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        }
        return 0;
    });
};
