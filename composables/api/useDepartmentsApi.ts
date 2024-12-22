import { GET_DEPARTMENTS } from "~/apis/graphql/query/queries";

export const useDepartmentsApi = () => {
    const { $apollo } = useNuxtApp();
    const { departments, setDepartments } = useDepartmentsState();

    const fetchDepartments = async () => {
        try {
            const result = await $apollo.query({
                query: GET_DEPARTMENTS
            });
            setDepartments(result.data.getDepartments);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };
    return { departments, fetchDepartments };
};
