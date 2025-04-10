export const COLUMN_LABEL_MAP: Record<string, string> = {
    amount: "金額",
    approval: "承認状況",
    create_date: "申請日",
    description: "経費の詳細",
    id: "ID",
    purchase_date: "購入日",
    payee: "支払先",
    note: "備考",
};

// 申請した経費のステータスをマッピング
export const REPORT_STATUS_LABEL = {
    draft: "下書き",
    pending: "未承認",
    approved: "承認済み",
    returned: "差戻し",
    rejected: "却下",
} as const;

// 携帯用のレスポンシブデザイン
export const PRIMARY_REPORT_STATUS_LABEL = {
    draft: "下書き",
    pending: "未承認",
} as const;
