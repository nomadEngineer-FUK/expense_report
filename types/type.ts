

export type FormType = {
    amount: number | null;
    description: string;
    department_id: number;
    id: number;
    note?: string;
    payee: string;
    purchase_date: string;
}

export type User = {
    id: number;
    username: string;
    mail: string;
    role: string;
}

export type Department = {
    id: number;
    name: string;
}

export type AccountingItem = {
    id: number;
    name: string;
}

// `GET_USERS` クエリの結果型
export type GetUsersQuery = {
    getUsers: User[];
}
