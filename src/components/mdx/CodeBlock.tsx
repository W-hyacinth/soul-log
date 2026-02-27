"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: string;
  className?: string;
  title?: string;
}

export function CodeBlock({ children, className, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-notion-border">
      {title && (
        <div className="px-4 py-2 text-xs font-mono text-notion-text-light bg-notion-bg-gray border-b border-notion-border">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className={`${className ?? ""} overflow-x-auto p-4 text-sm leading-relaxed bg-notion-bg-gray`}>
          <code>{children}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-xs rounded bg-notion-bg-hover text-notion-text-light hover:text-notion-text"
          aria-label="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
