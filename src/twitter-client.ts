/**
 * X (Twitter) API クライアントモジュール
 * OAuth 1.0a 認証でツイートを投稿する
 */

import { TwitterApi } from "twitter-api-v2";
import { config } from "./config.js";

export interface TweetResult {
    success: boolean;
    tweetId?: string;
    text: string;
    error?: string;
}

function createClient(): TwitterApi {
    return new TwitterApi({
        appKey: config.twitter.apiKey,
        appSecret: config.twitter.apiKeySecret,
        accessToken: config.twitter.accessToken,
        accessSecret: config.twitter.accessTokenSecret,
    });
}

export async function postTweet(text: string): Promise<TweetResult> {
    try {
        const client = createClient();
        const result = await client.v2.tweet(text);

        console.log(`✅ ツイート投稿成功！ ID: ${result.data.id}`);
        return { success: true, tweetId: result.data.id, text };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`❌ ツイート投稿失敗: ${message}`);

        if (error && typeof error === "object") {
            const apiError = error as Record<string, unknown>;
            if (apiError.data) {
                console.error("📋 APIレスポンス詳細:", JSON.stringify(apiError.data, null, 2));
            }
            if (apiError.code) {
                console.error("📋 ステータスコード:", apiError.code);
            }
        }

        return { success: false, text, error: message };
    }
}
