import { CheckCircle2, Inbox } from "lucide-react";

interface Props {
  filtered: boolean;
  title?: string;
  description?: string;
}

export function EmptyState({ filtered, title, description }: Props) {
  const defaultTitle = filtered ? "No matching todos" : "All caught up";
  const defaultDesc = filtered
    ? "Try a different search or filter."
    : "Add a task above to get started.";
  return (
    <div className="glass rounded-2xl p-8 text-center animate-pop">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-[var(--bg-muted)] flex items-center justify-center mb-3">
        {filtered ? (
          <Inbox className="h-6 w-6 text-[var(--fg-muted)]" />
        ) : (
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        )}
      </div>
      <h3 className="font-semibold">{title ?? defaultTitle}</h3>
      <p className="text-sm text-[var(--fg-muted)] mt-1">
        {description ?? defaultDesc}
      </p>
    </div>
  );
}
