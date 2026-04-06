import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { SITE_CONFIG } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-notion-bg/80 backdrop-blur-sm border-b border-notion-border">
      <SkipToContent />
      <div className="max-w-[var(--width-prose)] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold hover:opacity-70 transition-opacity"
          aria-label={`${SITE_CONFIG.title} 홈`}
        >
          {SITE_CONFIG.title}
        </Link>
        <nav className="flex items-center gap-4" aria-label="메인 내비게이션">
          <Link
            href="/tags"
            className="text-sm text-notion-text-light hover:text-notion-text transition-colors"
          >
            Tags
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
