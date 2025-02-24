import type { AccountingItem, Department, User } from "~/types/types";

// ✅ モックデータ：ユーザー
export const mockUsers: User[] = [
    { id: 1, username: "JohnDoe", mail: "john.doe@example.com", role: "admin" },
    { id: 2, username: "JaneSmith", mail: "jane.smith@example.com", role: "user" },
    { id: 3, username: "SamBrown", mail: "sam.brown@example.com", role: "user" },
    { id: 4, username: "User4", mail: "user4@example.com", role: "user" }
];

// ✅ モックデータ：部署
export const mockDepartments: Department[] = [
    { id: 1, name: "取締役" },
    { id: 2, name: "人事総務" },
    { id: 3, name: "財務経理" },
    { id: 4, name: "システム開発" },
    { id: 5, name: "営業" },
    { id: 6, name: "企画" }
];

// ✅ モックデータ：勘定科目
export const mockAccountingItems: AccountingItem[] = [
    { id: 1, name: "会議費" },
    { id: 2, name: "旅費交通費" },
    { id: 3, name: "接待交際費" },
    { id: 4, name: "消耗品費" },
    { id: 5, name: "通信費" }
];
