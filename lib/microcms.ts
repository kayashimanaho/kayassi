import { createClient } from "microcms-js-sdk";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is not set");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is not set");
}

// 環境変数の確認（デバッグ用 - 本番環境では削除推奨）
if (process.env.NODE_ENV === "development") {
  console.log("microCMS Configuration:");
  console.log("  Service Domain:", process.env.MICROCMS_SERVICE_DOMAIN);
  console.log("  API Key:", process.env.MICROCMS_API_KEY ? `${process.env.MICROCMS_API_KEY.substring(0, 8)}...` : "not set");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

