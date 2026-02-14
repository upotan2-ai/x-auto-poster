/**
 * Gemini AI クライアントモジュール
 * Gemini APIを使ってツイート文を自動生成する
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "./config.js";
import { buildPrompt } from "./prompt.js";

export async function generateTweet(): Promise<string> {
    const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    const model = genAI.getGenerativeModel({ model: config.gemini.model });

    const prompt = buildPrompt();
    console.log("🤖 Gemini にツイート生成をリクエスト中...\n");

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().trim();

    const cleaned = cleanupTweet(text);

    if (cleaned.length > 140) {
        console.warn(`⚠️ 生成文が${cleaned.length}文字です。140文字を超えています。再生成します...`);
        const retryResult = await model.generateContent(
            prompt + "\n\n【重要】前回は文字数オーバーでした。必ず140文字以内に収めてください。"
        );
        const retryText = retryResult.response.text().trim();
        const retryCleaned = cleanupTweet(retryText);

        if (retryCleaned.length > 140) {
            console.warn(`⚠️ 再生成後も${retryCleaned.length}文字。140文字で切り詰めます。`);
            return retryCleaned.substring(0, 140);
        }
        return retryCleaned;
    }

    return cleaned;
}

function cleanupTweet(text: string): string {
    let cleaned = text;
    cleaned = cleaned.replace(/^["「『]/, "");
    cleaned = cleaned.replace(/["」』]$/, "");
    cleaned = cleaned.trim();
    return cleaned;
}
