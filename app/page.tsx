import { Suspense } from "react";
import Link from "next/link";
import { getBlogPosts, getCategories } from "@/lib/api/blog";
import { BlogPostList } from "@/components/blog/blog-post-list";
import { BlogSearch } from "@/components/blog/blog-search";
import { CategoryFilter } from "@/components/blog/category-filter";
import { Pagination } from "@/components/blog/pagination";
import type { Category } from "@/types/blog";

type HomePageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    q?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;
  const categoryId = params.category;
  const searchQuery = params.q;

  let postsData;
  let categories: Category[];
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
    postsData = { contents: [], totalCount: 0 };
    categories = [];
  }

  const totalPages = Math.ceil(postsData.totalCount / limit);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md group-hover:shadow-lg transition-shadow">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-sm font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    にゅ
                  </span>
                </div>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                K's Blog
              </span>
            </Link>
            {/* <nav className="flex items-center gap-4">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </nav> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Blog Content - Left Side */}
          <div className="flex-1 min-w-0">
            {/* Page Title */}
            <div className="mb-8 animate-fade-in-up opacity-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-[family-name:var(--font-noto-serif)]">
                Latest Articles
              </h1>
              <p className="text-muted-foreground">
                最新の記事をお届けします
              </p>
            </div>

            {/* Search & Filter */}
            <div className="space-y-4 mb-8 animate-fade-in-up opacity-0 animation-delay-100">
              <BlogSearch initialQuery={searchQuery} />
              <CategoryFilter
                categories={categories}
                selectedCategoryId={categoryId}
              />
            </div>

            {/* Error Message */}
            {hasError && (
              <div className="mb-8 p-5 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-600 font-medium">エラーが発生しました</p>
                <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
              </div>
            )}

            {/* Blog Posts */}
            <div className="animate-fade-in-up opacity-0 animation-delay-200">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                }
              >
                <BlogPostList posts={postsData.contents} />
              </Suspense>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  categoryId={categoryId}
                  searchQuery={searchQuery}
                />
              </div>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <aside className="lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/50 rounded-3xl p-6 border border-indigo-100/50 animate-fade-in-up opacity-0 animation-delay-300">
                {/* Avatar */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-lg shadow-indigo-200/50 mb-4">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <span className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent font-[family-name:var(--font-noto-serif)]">
                        にゅ
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    K's Blog
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Developer /
                    housewife / mother
                  </p>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  こんにちは。こんにちは。
                </p>

                {/* Social Links */}
                {/* <div className="flex items-center justify-center gap-3">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-border hover:bg-indigo-50 hover:border-indigo-200 hover:scale-110 transition-all duration-300 shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </Link>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-border hover:bg-indigo-50 hover:border-indigo-200 hover:scale-110 transition-all duration-300 shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </Link>
                </div> */}
              </div>

              {/* Categories Card */}
              {categories.length > 0 && (
                <div className="bg-card rounded-2xl p-5 border border-border shadow-sm animate-fade-in-up opacity-0 animation-delay-400">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/?category=${category.id}`}
                        className={`flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${categoryId === category.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                          }`}
                      >
                        <span>{category.name}</span>
                        <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Card */}
              <div className="bg-card rounded-2xl p-5 border border-border shadow-sm animate-fade-in-up opacity-0 animation-delay-500">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "React", "Tailwind CSS", "microCMS"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} All K's Blog rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              {/* 追加：プライバシーポリシー */}
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                プライバシーポリシー
              </Link>
              {/* 追加：お問い合わせ（まだページがない場合は一旦トップへ戻すか、作成後にリンクを有効にしてください） */}
              <Link href="/contact" className="hover:text-foreground transition-colors">
                お問い合わせ
              </Link>
              {/* <Link href="https://github.com" className="hover:text-foreground transition-colors">
                GitHub
              </Link> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
