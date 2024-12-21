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
        departmentId: 1,
        department: "財務経理部",
    },
    {
        departmentId: 2,
        department: "人事総務部",
    },
    {
        departmentId: 3,
        department: "システム開発部",
    },
];

// モックデータ：勘定科目
export const mockAccountingItems: AccountingItem[] = [
    {
        accountingItemId: 1,
        accountingItemName: "旅費交通費"
    },
    {
        accountingItemId: 2,
        accountingItemName: "消耗品費"
    },
    {
        accountingItemId: 3,
        accountingItemName: "会議費"
    },
];
