/* eslint-disable indent */
/**
 * 経費精算テーブルのカラム
 */
export type ExpenseReportType = {
    create_date: Date;
    approval: boolean;
    amount: number | null;
    description: string;
    department_id: number;
    id: number;
    note?: string;
    payee: string;
    purchase_date: string;
};

/**
 * 表示するカラムのみを抽出
 */
// eslint-disable-next-line camelcase
export const DISPLAYED_COLUMNS: (keyof ExpenseReportType)[] = [
    "id",
    "create_date",
    "approval",
    "purchase_date",
    "payee",
    "amount",
    "description",
    "note",
] as const;
/**
 * 表示するカラムを再定義
 */
export type DisplayedExpenseReport = Pick<ExpenseReportType, typeof DISPLAYED_COLUMNS[number]>;

/**
 * 申請画面の 2. 経費の詳細 で使用
 */
export type ExpenseForm = {
    description: string
    department_id: number
    amount: number
}

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

// 承認状況のフィルター
export enum FilterType {
    All = "all",
    Approved = "approved",
    Unapproved = "unapproved",
}
export const filterOptions = [
    { label: "すべて", value: FilterType.All },
    { label: "承認済", value: FilterType.Approved },
    { label: "未承認", value: FilterType.Unapproved },
];

// ソート
export enum SortType {
    Asc = "asc",
    Desc = "desc",
}

export const sortOptions = [
    { label: "昇順", value: SortType.Asc },
    { label: "降順", value: SortType.Desc },
];
