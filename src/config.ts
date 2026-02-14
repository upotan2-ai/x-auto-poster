/**
 * 設定・環境変数管理モジュール
 * 必要な環境変数を型安全に読み込み、未設定の場合はエラーを投げる
 */

import "dotenv/config";

/**
 * 必須の環境変数を取得する。未設定の場合はエラーを投げる。
 */
function requireEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(
            `環境変数 ${key} が設定されていません。.env ファイルまたはシステム環境変数を確認してください。`
        );
    }
    return value;
}

/** アプリケーション設定 */
export const config = {
    /** X (Twitter) API 認証情報 */
    twitter: {
        apiKey: requireEnv("X_API_KEY"),
        apiKeySecret: requireEnv("X_API_KEY_SECRET"),
        accessToken: requireEnv("X_ACCESS_TOKEN"),
        accessTokenSecret: requireEnv("X_ACCESS_TOKEN_SECRET"),
    },

    /** Gemini AI 設定 */
    gemini: {
        apiKey: requireEnv("GEMINI_API_KEY"),
        model: process.env.GEMINI_MODEL || "gemini-2.0-flash-lite",
    },

    /** DRY_RUNモード（trueなら投稿せずコンソール出力のみ） */
    dryRun: process.env.DRY_RUN === "true",
} as const;
