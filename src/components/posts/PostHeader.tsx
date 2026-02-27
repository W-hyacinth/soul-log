import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import { tagToSlug } from "@/lib/posts";

interface PostHeaderProps {
  title: string;
  date: string;
  readingTime: number;
  tags: string[];
}

export function PostHeader({ title, date, readingTime, tags }: PostHeaderProps) {
  const formattedDate = format(new Date(date), "yyyy년 M월 d일", {
    locale: ko,
  });

  return (
    <header className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-notion-text">
        {title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-notion-text-light">
        <time dateTime={date}>{formattedDate}</time>
        <span aria-hidden="true">&middot;</span>
        <span>{readingTime}분 읽기</span>
      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tagToSlug(tag)}`}
              className="inline-flex px-2 py-0.5 rounded text-xs bg-notion-bg-gray text-notion-text-light hover:bg-notion-bg-hover transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
