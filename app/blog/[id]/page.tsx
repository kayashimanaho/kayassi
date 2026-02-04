import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPost } from "@/lib/api/blog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/date-utils";

type BlogPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  let post;
  try {
    post = await getBlogPost(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/blog">
            <ArrowLeft className="size-4 mr-2" />
            ブログ一覧に戻る
          </Link>
        </Button>
      </div>

      <article>
        {post.category && (
          <div className="mb-4">
            <span className="text-sm text-muted-foreground">
              {post.category.name}
            </span>
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="mb-6 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>

        {post.eyecatch && (
          <div className="relative w-full h-96 mb-8 overflow-hidden rounded-lg">
            <Image
              src={post.eyecatch.url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}

