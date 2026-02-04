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
      <div className="text-center py-12">
        <p className="text-muted-foreground">記事が見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.id}`}>
          <Card className="h-full hover:shadow-md transition-shadow">
            {post.eyecatch && (
              <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                <Image
                  src={post.eyecatch.url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <CardHeader>
              {post.category && (
                <span className="text-xs text-muted-foreground mb-2 inline-block">
                  {post.category.name}
                </span>
              )}
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              {post.excerpt && (
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {formatDate(post.publishedAt)}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

