export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category?: Category;
  eyecatch?: {
    url: string;
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type BlogPostListResponse = {
  contents: BlogPost[];
  totalCount: number;
  offset: number;
  limit: number;
};

