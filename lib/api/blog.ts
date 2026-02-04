import { client } from "@/lib/microcms";
import type { BlogPost, BlogPostListResponse, Category } from "@/types/blog";

export async function getBlogPosts(params?: {
  limit?: number;
  offset?: number;
  categoryId?: string;
  q?: string;
}): Promise<BlogPostListResponse> {
  const { limit = 10, offset = 0, categoryId, q } = params || {};

  const queries: Record<string, string> = {
    limit: limit.toString(),
    offset: offset.toString(),
    orders: "-publishedAt",
  };

  if (categoryId) {
    queries.filters = `category[equals]${categoryId}`;
  }

  if (q) {
    queries.q = q;
  }

  try {
    const response = await client.get<BlogPostListResponse>({
      endpoint: "blog",
      queries,
    });

    return response;
  } catch (error: any) {
    console.error("Error fetching blog posts:", error);
    console.error("Service Domain:", process.env.MICROCMS_SERVICE_DOMAIN);
    console.error("Endpoint: blog");
    console.error("Full URL would be:", `https://${process.env.MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/blog`);
    if (error.status === 400 && error.message?.includes("API is stopped")) {
      throw new Error(
        `microCMSのAPIが停止しています。microCMSの管理画面でAPIを再有効化するか、プランをアップグレードしてください。`
      );
    }
    if (error.status === 404) {
      throw new Error(
        `microCMSエンドポイント "blog" が見つかりません。microCMSの管理画面で以下の点を確認してください：\n` +
        `1. エンドポイント名が "blog" であること（大文字小文字も含めて正確に）\n` +
        `2. サービスドメインが正しいこと（現在: ${process.env.MICROCMS_SERVICE_DOMAIN || '未設定'}）\n` +
        `3. APIキーに読み取り権限があること`
      );
    }
    throw error;
  }
}

export async function getBlogPost(id: string): Promise<BlogPost> {
  try {
    const response = await client.get<BlogPost>({
      endpoint: "blog",
      contentId: id,
    });

    return response;
  } catch (error: any) {
    console.error("Error fetching blog post:", error);
    if (error.status === 404) {
      throw new Error(
        `Blog post with id "${id}" not found. Please check if the post exists in microCMS.`
      );
    }
    throw error;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await client.get<{ contents: Category[] }>({
      endpoint: "categories",
      queries: {
        orders: "name",
      },
    });

    return response.contents;
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    console.error("Service Domain:", process.env.MICROCMS_SERVICE_DOMAIN);
    console.error("Endpoint: categories");
    if (error.status === 400 && error.message?.includes("API is stopped")) {
      console.warn("microCMS API is stopped. Returning empty array.");
      return [];
    }
    if (error.status === 404) {
      console.warn("Categories endpoint not found. Returning empty array.");
      // Return empty array if categories endpoint doesn't exist
      return [];
    }
    throw error;
  }
}

