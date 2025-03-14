/**
 * 経費精算テーブルのカラム
 */
export type ExpenseReportType = {
    approval: boolean;
    amount: number | null;
    description: string;
    department_id: number;
    id: number;
    note?: string;
    payee: string;
    purchase_date: string;
    create_date: Date;
};

/**
 * 表示するカラムのみを抽出
 */
// eslint-disable-next-line camelcase
export const DISPLAYED_COLUMNS: (keyof ExpenseReportType)[] = [
    "id",
    "approval",
    "purchase_date",
    "payee",
    "amount",
    "description",
    "note",
    "create_date",
] as const;
/**
 * 表示するカラムを再定義
 */
export type DisplayedExpenseReport = Pick<ExpenseReportType, typeof DISPLAYED_COLUMNS[number]>;

export type User = {
    id: number;
    username: string;
    mail: string;
    role: string;
};

export type Department = {
    id: number;
    name: string;
};

export type AccountingItem = {
    id: number;
    name: string;
};

// `GET_USERS` クエリの結果型
export type GetUsersQuery = {
    getUsers: User[];
};
