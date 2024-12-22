import type { Department } from "~/types/type";

export const useDepartmentsState = () => {
    const departments = ref<Department[]>([]);
    const setDepartments = (items: Department[]) => {
        departments.value = items;
    }
    return { departments, setDepartments };
};
