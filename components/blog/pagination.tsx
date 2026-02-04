"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  categoryId?: string;
  searchQuery?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  categoryId,
  searchQuery,
}: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (categoryId) {
      params.set("category", categoryId);
    }
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    if (page > 1) {
      params.set("page", page.toString());
    }
    const queryString = params.toString();
    return `/blog${queryString ? `?${queryString}` : ""}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        asChild
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
      >
        <Link href={createPageUrl(currentPage - 1)}>
          <ChevronLeft className="size-4" />
          前へ
        </Link>
      </Button>

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          return (
            <Button
              key={pageNum}
              asChild
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
            >
              <Link href={createPageUrl(pageNum)}>{pageNum}</Link>
            </Button>
          );
        })}
      </div>

      <Button
        asChild
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
      >
        <Link href={createPageUrl(currentPage + 1)}>
          次へ
          <ChevronRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

