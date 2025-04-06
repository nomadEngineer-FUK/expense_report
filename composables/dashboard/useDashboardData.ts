import type { MonthlyReportDataOfEveryUser } from "~/types/types";

export const useDashBoardData = () => {

    // 表示年月選択のプルダウン
    // 一旦、2年分（最終的には、その人の入社年月を考慮できると良い）
    const lengthOfMonth = 24;
    const now = new Date();

    const optionsOfYearMonth = Array.from({ length: lengthOfMonth }).map((_, i) => {
        const date = new Date(now.getFullYear(), now.getMonth(), 1);
        date.setMonth(date.getMonth() - i);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const paddedMonth = String(month).padStart(2, "0");

        return {
            label: `${year}年${month}月`,
            value: `${year}/${paddedMonth}`
        };
    });


    // 選択された年月の前月を求める
    const getPreviousMonth = (yyyymm: string): string => {
        const [yearStr, monthStr] = yyyymm.split("/");
        const year = Number(yearStr);
        const month = Number(monthStr);

        let prevYear = year;
        let prevMonth = month - 1;

        if (prevMonth === 0) {
            prevYear -= -1
            prevMonth = 12
        }

        // 月を0埋め（2桁表示）
        const paddedMonth = String(prevMonth).padStart(2, "0");

        return `${prevYear}/${paddedMonth}`;
    };

    // ダッシュボード表示用に2ヶ月分のデータを形成
    const reportsForTwoConsecutiveMonths = computed(() => {
        const prevMonth = getPreviousMonth(yyyymm);

        const previousReport: MonthlyReportDataOfEveryUser = {
            yearMonth: prevMonth,
            count: 0,
            amount: 0,
        };

        return [props.latestReport, previousData]
    });

    return {
        optionsOfYearMonth,
        getPreviousMonth,
        reportsForTwoConsecutiveMonths,
    }
};