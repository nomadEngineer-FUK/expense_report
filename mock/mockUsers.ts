import type { AccountingItem, Department, User } from "~/types/type";

// モックデータ：ユーザー
export const mockUsers: User[] = [
    {
        id: 1,
        username: 'JohnDoe',
        mail: 'john.doe@example.com',
        role: 'admin',
    },
    {
        id: 2,
        username: 'JaneSmith',
        mail: 'jane.smith@example.com',
        role: 'user',
    },
    {
        id: 3,
        username: 'SamBrown',
        mail: 'sam.brown@example.com',
        role: 'user',
    },
];

// モックデータ：部署
export const mockDepartments: Department[] = [
    {
        id: 1,
        name: "財務経理部",
    },
    {
        id: 2,
        name: "人事総務部",
    },
    {
        id: 3,
        name: "システム開発部",
    },
];

// モックデータ：勘定科目
export const mockAccountingItems: AccountingItem[] = [
    {
        id: 1,
        name: "旅費交通費"
    },
    {
        id: 2,
        name: "消耗品費"
    },
    {
        id: 3,
        name: "会議費"
    },
];
