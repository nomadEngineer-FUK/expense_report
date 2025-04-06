import type { ExpenseStatus } from "./types/types";

export const COLUMN_LABEL_MAP: Record<string, string> = {
    id: "ID",
    approval: "承認状況",
    purchase_date: "購入日",
    payee: "支払先",
    amount: "金額",
    description: "経費の詳細",
    note: "備考",
    create_date: "申請日",
};

// 申請した経費のステータスをマッピング
export const REPORT_STATUS_LABEL: Record<ExpenseStatus, string> = {
    draft: "下書き",
    pending: "未承認",
    approved: "承認済み",
    returned: "差戻し",
    rejected: "却下",
}
