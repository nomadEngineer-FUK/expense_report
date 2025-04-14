// composables/expenseReport/useExpenseReportHistory.ts
import { ref, computed, onMounted } from "vue";
import type { ExpenseReportType } from "~/types/types";
import {
    FilterType,
    SortType,
    filterOptions,
    DISPLAYED_COLUMNS
} from "~/types/types";
import {
    fetchExpenseReports,
    filterExpenseReports,
    sortExpenseReports,
} from "~/useCases/fetchExpenseReports";
import { COLUMN_LABEL_MAP } from "~/constants";
import { useIsUnderBreakpoint } from "~/composables/api/supabase/common/useCommon";
import { useMonthlyHistory } from "~/composables/expenseReport/useMonthlyHistory";

export const useExpenseReportHistory = () => {
    const mappedColumns = (col: string) => COLUMN_LABEL_MAP[col] || col;

    const columnNames = ref(DISPLAYED_COLUMNS);
    const filterType = ref<FilterType>(filterOptions[0].value);
    const sortKey = ref<keyof ExpenseReportType>("id");
    const sortOrder = ref<SortType>(SortType.Asc);
    const allExpenseReports = ref<(ExpenseReportType & { formattedDate: string })[]>([]);

    const sortKeyOptions = computed(() =>
        columnNames.value.map((col) => ({
            label: mappedColumns(col),
            value: col,
        }))
    );

    const processedReports = computed(() => {
        const filtered = filterExpenseReports(
            allExpenseReports.value,
            filterType.value
        );
        return sortExpenseReports(filtered, sortKey.value, sortOrder.value);
    });

    const getApprovalStatusText = (approval: boolean) =>
        approval ? "承認済" : "未承認";

    const getApprovalStatusClass = (approval: boolean) =>
        approval ? "status-approved" : "status-unapproved";

    const isTablet = useIsUnderBreakpoint(1023);
    const layout = computed<"row" | "column">(() =>
        isTablet.value ? "row" : "column"
    );

    const { displayData, fetchAll } = useMonthlyHistory();
    const optionsForMonthlyData = computed(() =>
        displayData.value.map((item) => ({
            label: `${item.yearMonth.replace("/", "年")}月（${item.count}件）`,
            value: item.yearMonth,
        }))
    );

    const selectedYearMonth = ref<string>("");

    onMounted(async () => {
        await fetchAll();
        allExpenseReports.value = await fetchExpenseReports();
    });

    return {
        mappedColumns,
        columnNames,
        filterType,
        sortKey,
        sortOrder,
        sortKeyOptions,
        processedReports,
        getApprovalStatusText,
        getApprovalStatusClass,
        layout,
        optionsForMonthlyData,
        selectedYearMonth,
    };
};
