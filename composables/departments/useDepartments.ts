import { GET_DEPARTMENTS } from "~/apis/graphql/query/queries";
import type { Department } from "~/types/type";

export const useDepartments = () => {
    const { $apollo } = useNuxtApp();
    const departments = ref<Department[]>([]);

    const fetchDepartments = async () => {
        try {
            const result = await $apollo.query({
                query: GET_DEPARTMENTS
            });
            departments.value = result.data.getDepartments;
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    }

    return { departments, fetchDepartments };
};
