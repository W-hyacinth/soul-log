export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string | null;
  readingTime: number;
  content: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover: string | null;
  readingTime: number;
}
