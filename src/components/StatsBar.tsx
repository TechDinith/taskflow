import { Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { clearCompleted } from "@/features/todos/todosSlice";


export function StatsBar() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.todos.items);
  const total = items.length;
  const done = items.filter((t) => t.completed).length;
  const active = total - done;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between text-xs text-[var(--fg-muted)] mb-1.5">
          <span>
            {active} active · {done} done · {total} total
          </span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[var(--bg-muted)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      {done > 0 && (
        <button
          type="button"
          onClick={() => dispatch(clearCompleted())}
          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--fg-muted)] hover:text-rose-500 hover:border-rose-500/40 transition-colors focus-ring"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear completed
        </button>
      )}
    </div>
  );
}
