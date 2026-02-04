import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/date-utils";

type BlogPostListProps = {
  posts: BlogPost[];
};

export function BlogPostList({ posts }: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <p className="text-muted-foreground text-lg">記事が見つかりませんでした</p>
        <p className="text-muted-foreground/70 text-sm mt-2">別のキーワードで検索してみてください</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {posts.map((post, index) => (
        <Link 
          key={post.id} 
          href={`/blog/${post.id}`}
          className="group"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <Card className="h-full overflow-hidden border-0 bg-card shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
            {post.eyecatch ? (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={post.eyecatch.url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ) : (
              <div className="relative w-full h-48 bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-50 flex items-center justify-center">
                <span className="text-4xl font-bold text-indigo-300/50 font-[family-name:var(--font-noto-serif)]">
                  {post.title.charAt(0)}
                </span>
              </div>
            )}
            <CardHeader className="pb-3">
              {post.category && (
                <span className="text-xs font-medium text-primary/80 uppercase tracking-wider mb-1 inline-block">
                  {post.category.name}
                </span>
              )}
              <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors duration-300">
                {post.title}
              </CardTitle>
              {post.excerpt && (
                <CardDescription className="line-clamp-2 text-sm">
                  {post.excerpt}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(post.publishedAt)}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
