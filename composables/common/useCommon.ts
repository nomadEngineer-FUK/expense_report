/**
 * 数値をカンマ付きに変換
 */
export const formatNumber = (
    value: number | string | null | undefined,
    fallBack = "-"
): string => {
    if (value == null || value === "") return fallBack;

    const num = typeof value === "string" ? Number(value) : value;
    if (Number.isNaN(num)) return fallBack;

    return num.toLocaleString("ja-JP");
};