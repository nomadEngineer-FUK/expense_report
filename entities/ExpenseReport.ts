import type { ExpenseReportType } from "~/types/types";

export class ExpenseReport {
    private data: ExpenseReportType;

    constructor(data: ExpenseReportType) {
        this.data = data;
    }

    // 新しいフォームを作成
    static createNewForm(): Omit<ExpenseReportType, "id" | "department_id"> {
        return {
            amount: null,
            description: "",
            note: "",
            payee: "",
            purchase_date: "",
        };
    }
}
