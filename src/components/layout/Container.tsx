export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[var(--width-prose)] mx-auto px-4 sm:px-6">
      {children}
    </div>
  );
}
