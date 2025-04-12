import { ref, onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

/**
 * 端末のサイズを検知
 * @param width - ブレイクポイント
 * @returns
 */
export const useIsUnderBreakpoint = (width: number): Ref<boolean> => {
    const isUnderBreakpoint = ref(false);

    const checkSize = () => {
        isUnderBreakpoint.value = window.innerWidth <= width;
    };

    onMounted(() => {
        checkSize();
        window.addEventListener("resize", checkSize);
    });
    onUnmounted(() => {
        window.removeEventListener("resize", checkSize);
    });

    return isUnderBreakpoint;
};
