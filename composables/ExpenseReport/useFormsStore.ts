import type { ExpenseReportType } from "~/types/types";

export function useFormsStore() {

    const forms = useState<ExpenseReportType[]>("forms", () => []);
    const idCounter = useState("idCounter", () => 1);

    /**
     * ## IDは2種類存在する
     * 
     * 1. 申請時のid
     *      -> イチ申請フォーム内における管理のためで、フォーム増減（+/- ボタン）の操作のため
     * 2. バックエンド側で管理用id
     *      -> DBに登録された全申請の管理用
     */
    const generateId = (): number => {
        return idCounter.value++;
    };

    // 新しいフォームを作成
    const createNewForm = (): ExpenseReportType => ({
        amount: null,
        description: "",
        department_id: 1,
        id: generateId(),
        note: "",
        payee: "",
        purchase_date: ""
    });

    // フォームの初期状態
    if (forms.value.length === 0) {
        forms.value.push(createNewForm());
    }

    // 任意の位置にフォームを追加
    const addFormAt = (index: number): void => {
        forms.value.splice(index + 1, 0, createNewForm());
    };

    // 最上部にフォームを追加
    const addFormToTop = (): void => {
        forms.value.unshift(createNewForm());
    };

    // 任意のフォームを削除
    const removeForm = (id: number): void => {
        if (forms.value.length > 1) {
            forms.value = forms.value.filter((form) => form.id !== id);
        }
    };

    return {
        forms,
        addFormAt,
        addFormToTop,
        createNewForm,
        removeForm
    };
};
