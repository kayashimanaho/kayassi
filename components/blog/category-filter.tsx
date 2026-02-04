"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types/blog";
import { cn } from "@/lib/utils";

type CategoryFilterProps = {
  categories: Category[];
  selectedCategoryId?: string;
};

export function CategoryFilter({
  categories,
  selectedCategoryId,
}: CategoryFilterProps) {
  const searchParams = useSearchParams();

  const createCategoryUrl = (categoryId?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    params.delete("page"); // カテゴリ変更時はページをリセット
    return `/blog?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        asChild
        variant={!selectedCategoryId ? "default" : "outline"}
        size="sm"
      >
        <Link href={createCategoryUrl()}>すべて</Link>
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          asChild
          variant={selectedCategoryId === category.id ? "default" : "outline"}
          size="sm"
        >
          <Link href={createCategoryUrl(category.id)}>{category.name}</Link>
        </Button>
      ))}
    </div>
  );
}

