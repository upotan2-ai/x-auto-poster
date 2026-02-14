# 🤖 X(旧Twitter) AI自動投稿ボット

Gemini AI がツイート内容を自動生成し、Xに定期投稿するボットです。

## ✨ 特徴

- **Gemini 2.0 Flash** でツイート文を自動生成
- **8種類のテーマ** からランダム選択（テック、AI、ライフハック、モチベーション等）
- **時間帯に応じたトーン調整**（朝は爽やか、夜は落ち着いた雰囲気）
- **GitHub Actions** で1日3回（9:00 / 12:00 / 19:00 JST）自動投稿
- **DRY RUN モード** で投稿せずにテスト可能
- **完全無料** で運用可能

## 🚀 セットアップ

### 1. API キーの取得

#### X (Twitter) API
1. [X Developer Portal](https://developer.x.com/) にアクセス
2. 新しいアプリを作成
3. **User Authentication Settings** で OAuth 1.0a を有効化（Read and Write 権限）
4. 以下の4つのキーをメモ:
   - API Key
   - API Key Secret
   - Access Token
   - Access Token Secret

#### Gemini API
1. [Google AI Studio](https://aistudio.google.com/apikey) にアクセス
2. API キーを作成してメモ

### 2. ローカルでテスト

```bash
# リポジトリをクローン
git clone https://github.com/your-username/x-auto-poster.git
cd x-auto-poster

# 依存パッケージをインストール
npm install

# 環境変数を設定
cp .env.example .env
# .env ファイルを編集して実際のAPIキーを入力

# DRY RUN モードでテスト（Xには投稿されません）
npm run dry-run

# Windows の場合
npm run dry-run:win
```

### 3. GitHub にデプロイ

```bash
# GitHubリポジトリを作成してプッシュ
git init
git add .
git commit -m "🤖 X自動投稿ボットの初期セットアップ"
git remote add origin https://github.com/your-username/x-auto-poster.git
git push -u origin main
```

#### Secrets の設定

リポジトリの **Settings** → **Secrets and variables** → **Actions** で以下を追加:

| Secret名 | 値 |
|-----------|-----|
| `X_API_KEY` | X API Key |
| `X_API_KEY_SECRET` | X API Key Secret |
| `X_ACCESS_TOKEN` | X Access Token |
| `X_ACCESS_TOKEN_SECRET` | X Access Token Secret |
| `GEMINI_API_KEY` | Gemini API Key |

### 4. 動作確認

リポジトリの **Actions** タブ → **Auto Post to X** → **Run workflow** で手動実行してテスト。

## 📁 プロジェクト構成

```
x-auto-poster/
├── src/
│   ├── index.ts          # メインエントリーポイント
│   ├── config.ts         # 環境変数・設定管理
│   ├── twitter-client.ts # X API クライアント
│   ├── gemini-client.ts  # Gemini AI クライアント
│   └── prompt.ts         # プロンプトテンプレート管理
├── .github/workflows/
│   └── auto-post.yml     # GitHub Actions ワークフロー
├── .env.example          # 環境変数テンプレート
├── package.json
├── tsconfig.json
└── README.md
```

## ⚙️ カスタマイズ

### 投稿テーマの変更

`src/prompt.ts` の `THEMES` 配列を編集して、投稿テーマを追加・変更できます。

### 投稿スケジュールの変更

`.github/workflows/auto-post.yml` の `cron` を編集してスケジュールを変更できます。

```yaml
schedule:
  # UTC で指定（JST = UTC + 9）
  - cron: '0 0 * * *'   # 09:00 JST
  - cron: '0 3 * * *'   # 12:00 JST
  - cron: '0 10 * * *'  # 19:00 JST
```

## ⚠️ 注意事項

- X 無料プランの上限は **月1,500件** です（1日3回なら月90件で安全）
- GitHub Actions の cron は **数分の遅延** が発生する場合があります
- 生成されるツイートは AI による自動生成です。投稿内容は定期的に確認してください
