import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-notion-border py-8 mt-16">
      <div className="max-w-[var(--width-prose)] mx-auto px-4 sm:px-6 text-sm text-notion-text-light">
        <p>
          &copy; {new Date().getFullYear()} {SITE_CONFIG.author.name}. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
