import { ref } from "vue";
import { useIdCounter } from "./useIdCounter";

const forms = ref<{ id: number }[]>([]); // フォームの状態
const { generateId } = useIdCounter();   // フォームのユニークIDを生成

// 初期状態としてフォームを1つ追加
if (forms.value.length === 0) {
    forms.value.push({ id: generateId() });
}

export function useFormsStore() {

    // 任意の位置にフォームを追加
    const addFormAt = (index: number) => {
        forms.value.splice(index + 1, 0, { id: generateId() });
    };

    // 最上部にフォームを追加
    const addFormToTop = () => {
        forms.value.unshift({ id: generateId() });
    };

    // 任意のフォームを削除
    const removeForm = (id: number) => {
        if (forms.value.length > 1) {
            forms.value = forms.value.filter((form) => form.id !== id);
        }
    };

    return {
        forms,
        addFormAt,
        addFormToTop,
        removeForm
    }
};
