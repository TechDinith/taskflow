import { Search, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setFilter, setSearch, setSort } from "@/features/todos/todosSlice";
import type { Filter, Sort } from "@/types/todo";
import { cn } from "@/lib/cn";
import { Select } from "./Select";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Done" },
];

const sorts: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "priority", label: "Priority" },
  { value: "due", label: "Due date" },
];

export function TodoFilters() {
  const dispatch = useAppDispatch();
  const { filter, search, sort } = useAppSelector((s) => s.todos);

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--fg-muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search todos…"
          className="w-full pl-9 pr-9 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] text-sm focus-ring"
        />
        {search && (
          <button
            type="button"
            onClick={() => dispatch(setSearch(""))}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-[var(--bg-muted)] text-[var(--fg-muted)]"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => dispatch(setFilter(f.value))}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors focus-ring",
                filter === f.value
                  ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <Select
          value={sort}
          options={sorts.map((s) => ({ value: s.value, label: s.label }))}
          onChange={(v) => dispatch(setSort(v as Sort))}
          ariaLabel="Sort todos"
        />
      </div>
    </div>
  );
}
