import { Suspense } from "react";
import { getBlogPosts, getCategories } from "@/lib/api/blog";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { BlogSearch } from "@/components/blog/blog-search";
import { CategoryFilter } from "@/components/blog/category-filter";
import { Pagination } from "@/components/blog/pagination";

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    q?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const categoryId = params.category;
  const searchQuery = params.q;

  let postsData;
  let categories;
  let hasError = false;
  let errorMessage = "";

  try {
    [postsData, categories] = await Promise.all([
      getBlogPosts({
        limit,
        offset,
        categoryId,
        q: searchQuery,
      }),
      getCategories(),
    ]);
  } catch (error: any) {
    console.error("Error loading blog data:", error);
    hasError = true;
    errorMessage = error.message || "データの読み込みに失敗しました";
    // Return empty state if API fails
    postsData = { contents: [], totalCount: 0 };
    categories = [];
  }

  const totalPages = Math.ceil(postsData.totalCount / limit);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">ブログ</h1>
        <p className="text-muted-foreground">
          記事一覧からお気に入りの記事を見つけてください
        </p>
      </div>

      <div className="mb-6">
        <BlogSearch initialQuery={searchQuery} />
      </div>

      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          selectedCategoryId={categoryId}
        />
      </div>

      {hasError && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive font-medium">エラー</p>
          <p className="text-sm text-muted-foreground mt-1">{errorMessage}</p>
          <p className="text-xs text-muted-foreground mt-2">
            microCMSの設定を確認してください。環境変数（MICROCMS_SERVICE_DOMAIN、MICROCMS_API_KEY）が正しく設定されているか、エンドポイント（blog、categories）が存在するか確認してください。
          </p>
        </div>
      )}

      <Suspense fallback={<div>読み込み中...</div>}>
        <BlogPostList posts={postsData.contents} />
      </Suspense>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            categoryId={categoryId}
            searchQuery={searchQuery}
          />
        </div>
      )}
    </div>
  );
}

