"use client";

import { useState, useMemo, useEffect, useRef, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Fuse from "fuse.js";
import type { PostMeta } from "@/types";
import { PostCard } from "./PostCard";
import { PostList } from "./PostList";

interface SearchBarProps {
  posts: PostMeta[];
}

export function SearchBar({ posts }: SearchBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const scrollRestored = useRef(false);

  useEffect(() => {
    if (scrollRestored.current) return;
    scrollRestored.current = true;
    const savedY = sessionStorage.getItem("homeScroll");
    if (savedY) {
      sessionStorage.removeItem("homeScroll");
      requestAnimationFrame(() => {
        window.scrollTo({ top: parseInt(savedY), behavior: "instant" });
      });
    }
  }, []);

  const handleChange = (value: string) => {
    setQuery(value);
    startTransition(() => {
      const params = new URLSearchParams();
      if (value.trim()) params.set("q", value);
      router.replace(params.size ? `/?${params}` : "/", { scroll: false });
    });
  };

  const saveScroll = () => {
    sessionStorage.setItem("homeScroll", String(window.scrollY));
  };

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: "title", weight: 2 },
          { name: "description", weight: 1.5 },
          { name: "tags", weight: 1 },
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    [posts],
  );

  const isSearching = query.trim().length > 0;
  const results = isSearching
    ? fuse.search(query).map((r) => r.item)
    : null;

  return (
    <div>
      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-notion-text-light"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="포스트 검색..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-notion-border bg-notion-bg text-notion-text placeholder:text-notion-text-light text-sm outline-none focus:border-notion-link transition-colors"
        />
        {query && (
          <button
            onClick={() => handleChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-notion-text-light hover:text-notion-text transition-colors"
            aria-label="검색어 지우기"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {isSearching ? (
        <div>
          <p className="text-sm text-notion-text-light mb-4">
            {results!.length > 0 ? `${results!.length}개의 결과` : null}
          </p>
          {results!.length > 0 ? (
            <div className="divide-y divide-notion-border">
              {results!.map((post) => (
                <PostCard key={post.slug} post={post} onClick={saveScroll} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
              <svg
                className="w-10 h-10 text-notion-text-light opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-notion-text font-medium">검색 결과가 없습니다.</p>
              <p className="text-sm text-notion-text-light">
                <span className="font-medium text-notion-text">&ldquo;{query}&rdquo;</span>
                {" "}에 대한 결과를 찾을 수 없습니다.
              </p>
            </div>
          )}
        </div>
      ) : (
        <PostList posts={posts} onClick={saveScroll} />
      )}
    </div>
  );
}
