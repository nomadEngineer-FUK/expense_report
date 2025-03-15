module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    env: {
        browser: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.eslint.json"],
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ["dist"],
    extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    rules: {
        "no-console": "off",
        "import/prefer-default-export": "off",
        quotes: ["error", "double"],
        "linebreak-style": "off",
        indent: ["error", 4, { SwitchCase: 1 }], // スペース4つ & タブ1回は許容 for JS
        "@typescript-eslint/indent": ["error", 4], // スペース4つ & タブ1回は許容 for TS
        "@typescript-eslint/quotes": ["error", "double"],
        "no-plusplus": "off", // ❌ `++` を許可
        "object-curly-newline": "off", // ❌ オブジェクトの改行ルールを無効化
        "no-param-reassign": "off", // ❌ 関数の引数変更を許可
        "no-underscore-dangle": "off", // ❌ `_` で始まる変数名を許可
        "@typescript-eslint/no-unsafe-assignment": "off", // ❌ `useState` などの型エラーを無効化
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
    },
};
