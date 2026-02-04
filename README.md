# ブログサイト

Next.js + microCMS で作成した個人ブログです。

## 技術スタック

- Next.js 15（App Router）
- TypeScript
- Tailwind CSS
- shadcn/ui
- microCMS

## セットアップ

### 1. パッケージをインストール

```bash
npm install
```

### 2. 環境変数を設定

`.env.local` ファイルを作成：

```env
MICROCMS_SERVICE_DOMAIN=あなたのサービスドメイン
MICROCMS_API_KEY=あなたのAPIキー
```

### 3. microCMS の設定

以下の2つのAPIを作成してください：

**① categories API**
| フィールドID | 表示名 | タイプ |
|-------------|--------|--------|
| name | カテゴリ名 | テキストフィールド |

**② blog API**
| フィールドID | 表示名 | タイプ |
|-------------|--------|--------|
| title | タイトル | テキストフィールド |
| content | 本文 | リッチエディタ |
| excerpt | 抜粋 | テキストエリア |
| category | カテゴリ | 参照（→ categories） |
| eyecatch | アイキャッチ | 画像 |

### 4. 開発サーバーを起動

```bash
npm run dev
```

http://localhost:3000 を開いて確認してください。

## デプロイ

Vercel でデプロイする場合は、環境変数を Vercel の設定画面で追加してください。
