# Kayassi Blog

Next.js 15 App Router、shadcn/ui、microCMSで構築されたモダンなブログサイトです。

## 技術スタック

- **Next.js 15** - App Routerを使用
- **shadcn/ui** - UIコンポーネントライブラリ
- **microCMS** - ヘッドレスCMS
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング

## 機能

- ✅ 記事一覧表示
- ✅ カテゴリごとの記事一覧表示
- ✅ 検索機能
- ✅ ページネーション

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

プロジェクトのルートディレクトリ（`package.json`がある場所）に`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

**環境変数の取得方法：**
- microCMSのサービスドメインとAPIキーは、[microCMS](https://microcms.io/)の管理画面から取得できます
- サービスドメイン：microCMSの管理画面の「設定」→「API」から確認できます
- APIキー：microCMSの管理画面の「設定」→「API」→「APIキー」から取得できます（読み取り専用のAPIキーを使用してください）

**注意：**
- `.env.local`ファイルは`.gitignore`に含まれているため、Gitにはコミットされません
- 本番環境（Vercelなど）にデプロイする場合は、デプロイ先の環境変数設定画面で同じ環境変数を設定してください

### 3. microCMSのAPI設定

microCMSで以下の2つのエンドポイントを作成してください。

#### 3-1. categoriesエンドポイントの作成

1. microCMSの管理画面にログインします
2. 左メニューの「コンテンツ」をクリック
3. 「新規API作成」ボタンをクリック
4. 以下の設定を入力：
   - **API ID**: `categories`（必ずこの名前で作成してください）
   - **表示名**: `カテゴリ`（任意）
5. 「作成」ボタンをクリック
6. フィールドを追加します：
   - 「フィールドを追加」ボタンをクリック
   - **フィールドID**: `name`
   - **表示名**: `カテゴリ名`
   - **フィールドタイプ**: `テキストフィールド`を選択
   - 「保存」をクリック
7. 左メニューの「コンテンツ」→「categories」から、サンプルデータを1つ以上作成してください（例：「技術」「デザイン」「その他」など）

#### 3-2. blogエンドポイントの作成

1. 左メニューの「コンテンツ」をクリック
2. 「新規API作成」ボタンをクリック
3. 以下の設定を入力：
   - **API ID**: `blog`（必ずこの名前で作成してください）
   - **表示名**: `ブログ`（任意）
4. 「作成」ボタンをクリック
5. 以下のフィールドを順番に追加します：

   **① titleフィールド（タイトル）**
   - 「フィールドを追加」をクリック
   - **フィールドID**: `title`
   - **表示名**: `タイトル`
   - **フィールドタイプ**: `テキストフィールド`を選択
   - 「保存」をクリック

   **② contentフィールド（本文）**
   - 「フィールドを追加」をクリック
   - **フィールドID**: `content`
   - **表示名**: `本文`
   - **フィールドタイプ**: `リッチエディタ`を選択
   - 「保存」をクリック

   **③ excerptフィールド（抜粋）**
   - 「フィールドを追加」をクリック
   - **フィールドID**: `excerpt`
   - **表示名**: `抜粋`
   - **フィールドタイプ**: `テキストエリア`を選択
   - 「保存」をクリック

   **④ categoryフィールド（カテゴリ）**
   - 「フィールドを追加」をクリック
   - **フィールドID**: `category`
   - **表示名**: `カテゴリ`
   - **フィールドタイプ**: `参照`を選択
   - **参照先API**: `categories`を選択
   - 「保存」をクリック

   **⑤ thumbnailフィールド（サムネイル画像）**
   - 「フィールドを追加」をクリック
   - **フィールドID**: `thumbnail`
   - **表示名**: `サムネイル`
   - **フィールドタイプ**: `画像`を選択
   - 「保存」をクリック

6. 左メニューの「コンテンツ」→「blog」から、サンプル記事を1つ以上作成してください

**重要：**
- API IDは必ず `blog` と `categories` という名前で作成してください（大文字小文字も正確に）
- フィールドIDも上記の通り正確に入力してください
- エンドポイント名やフィールド名が異なると、404エラーが発生します

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
