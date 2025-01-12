import { ref } from "vue";

export function useIdCounter (): { generateId: () => number } {
    const idCounter = ref(1);

    const generateId = () => idCounter.value++;

    return { generateId };
};
