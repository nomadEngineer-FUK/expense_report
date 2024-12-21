



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