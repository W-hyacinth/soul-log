"use client";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      onClick={(e) => {
        e.preventDefault();
        const main = document.getElementById("main-content");
        if (main) {
          main.focus({ preventScroll: false });
          main.scrollIntoView();
        }
      }}
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-notion-bg focus:text-notion-text focus:rounded-lg focus:border focus:border-notion-border focus:text-sm"
    >
      본문으로 건너뛰기
    </a>
  );
}
