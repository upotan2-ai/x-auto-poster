/**
 * X自動投稿ボット - メインエントリーポイント
 */

import { config } from "./config.js";
import { generateTweet } from "./gemini-client.js";
import { postTweet } from "./twitter-client.js";

const DIVIDER = "─".repeat(50);

async function main(): Promise<void> {
    console.log(DIVIDER);
    console.log("🚀 X 自動投稿ボット 起動");
    console.log(`📅 ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`);
    console.log(`🔧 モード: ${config.dryRun ? "DRY RUN（テスト）" : "本番投稿"}`);
    console.log(DIVIDER);

    try {
        const tweet = await generateTweet();

        console.log(DIVIDER);
        console.log("📝 生成されたツイート:");
        console.log(`\n  ${tweet}\n`);
        console.log(`📏 文字数: ${tweet.length}/140`);
        console.log(DIVIDER);

        if (config.dryRun) {
            console.log("🏃 DRY RUN モード: 実際の投稿はスキップされました");
            console.log("💡 本番投稿するには DRY_RUN=false で実行してください");
        } else {
            console.log("📤 X に投稿中...");
            const result = await postTweet(tweet);

            if (result.success) {
                console.log(`🎉 投稿完了！ https://x.com/i/status/${result.tweetId}`);
            } else {
                console.error(`💥 投稿に失敗しました: ${result.error}`);
                process.exit(1);
            }
        }

        console.log(DIVIDER);
        console.log("✨ 処理完了");
    } catch (error) {
        console.error(DIVIDER);
        console.error("💥 エラーが発生しました:");
        console.error(error instanceof Error ? error.message : String(error));
        console.error(DIVIDER);
        process.exit(1);
    }
}

main();
