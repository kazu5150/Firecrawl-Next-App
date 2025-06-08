# Firecrawl Web Scraper

Next.jsとFirecrawlを使用した強力なWebスクレイピングアプリケーションです。単一ページのスクレイピングやWebサイト全体のクローリングが可能です。

## 機能

- **単一ページスクレイピング**: 個別のWebページからコンテンツを抽出
- **Webサイトクローリング**: Webサイトの複数ページをクロール
- **複数のエクスポート形式**: JSON、Markdown、CSV形式での結果エクスポート
- **ダークモード対応**: あらゆる照明環境で快適な表示
- **エラーハンドリング**: ユーザーフレンドリーなメッセージによる包括的なエラー処理
- **ローディング状態**: スクレイピング操作中の視覚的フィードバック

## 前提条件

このアプリケーションを実行する前に、以下が必要です：

1. Node.js (v18以上)
2. [Firecrawl](https://www.firecrawl.dev/)のAPIキー

## セットアップ

1. リポジトリをクローン:
```bash
git clone https://github.com/kazu5150/Firecrawl-Next-App.git
cd Firecrawl-Next-App
```

2. 依存関係をインストール:
```bash
npm install
```

3. 環境変数を設定:
ルートディレクトリに`.env.local`ファイルを作成し、FirecrawlのAPIキーを追加:
```
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
```

4. 開発サーバーを起動:
```bash
npm run dev
```

5. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 使用方法

### 単一ページのスクレイピング

1. "Scrape (Single Page)"モードを選択
2. スクレイピングしたいURLを入力
3. "Start Scraping"をクリック
4. 結果を確認し、お好みの形式でエクスポート

### 複数ページのクローリング

1. "Crawl (Multiple Pages)"モードを選択
2. クロールの開始URLを入力
3. "Start Crawling"をクリック
4. デフォルトで最大10ページをクロール
5. すべての結果をお好みの形式でエクスポート

## APIエンドポイント

- `POST /api/scrape` - 単一URLのスクレイピング
- `POST /api/crawl` - URLからのクローリング開始
- `GET /api/crawl?jobId={id}` - クロールジョブのステータス確認

## 技術スタック

- **Next.js 15** - App Routerを使用したReactフレームワーク
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **Firecrawl** - Webスクレイピングエンジン

## プロジェクト構成

```
firecrawl-app/
├── app/
│   ├── api/
│   │   ├── crawl/
│   │   │   └── route.ts
│   │   └── scrape/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── LoadingSpinner.tsx
├── lib/
│   ├── errors.ts
│   └── export.ts
└── .env.local
```

## エラーハンドリング

アプリケーションは以下のエラーシナリオに対応しています：
- 無効または欠落したAPIキー
- レート制限
- タイムアウトエラー
- ネットワーク障害

## 貢献

IssueやPull Requestはお気軽にお送りください。

## ライセンス

MIT
