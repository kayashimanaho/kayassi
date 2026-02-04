import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <h1 className="text-4xl font-bold mb-4">記事が見つかりません</h1>
      <p className="text-muted-foreground mb-8">
        お探しの記事は存在しないか、削除された可能性があります。
      </p>
      <Button asChild>
        <Link href="/">ブログ一覧に戻る</Link>
      </Button>
    </div>
  );
}

