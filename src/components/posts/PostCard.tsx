import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import type { PostMeta } from "@/types/index";

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export function PostCard({ post, onClick }: { post: PostMeta; onClick?: () => void }) {
  const formattedDate = format(new Date(post.date), "yyyy년 M월 d일", {
    locale: ko,
  });

  return (
    <Link href={`/posts/${post.slug}`} onClick={onClick} className="block group">
      <article className="py-4 px-3 -mx-3 rounded-md transition-colors duration-150 group-hover:bg-notion-bg-hover">
        <h2 className="text-lg font-semibold text-notion-text leading-snug">
          {post.title}
        </h2>

        {post.description && (
          <p className="mt-1 text-sm text-notion-text-light leading-relaxed">
            {truncate(post.description, 120)}
          </p>
        )}

        <div className="mt-2 flex items-center gap-3 text-xs text-notion-text-light">
          <time dateTime={post.date}>{formattedDate}</time>

          {post.tags.length > 0 && (
            <div className="flex items-center gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex px-1.5 py-0.5 rounded bg-notion-bg-gray text-notion-text-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
