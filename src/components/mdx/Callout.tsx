import type { ReactNode } from "react";

interface CalloutProps {
  emoji?: string;
  children: ReactNode;
}

export function Callout({ emoji = "💡", children }: CalloutProps) {
  return (
    <div className="flex gap-3 rounded-md bg-notion-callout-bg p-4 my-4">
      <span className="text-xl leading-none select-none" role="img">
        {emoji}
      </span>
      <div className="flex-1 min-w-0 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
