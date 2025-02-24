import type { FormType } from "~/types/type";

export function useFormsStore() {

    const forms = useState<FormType[]>("forms", () => []);
    const idCounter = useState("idCounter", () => 1);

    const generateId = (): number => {
        return idCounter.value++;
    };

    // 新しいフォームを作成
    const createNewForm = (): FormType => ({
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
    }
};
