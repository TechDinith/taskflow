import { useState } from "react";
import { Plus, Flag, Calendar } from "lucide-react";
import { useAppDispatch } from "@/hooks/redux";
import { addTodo } from "@/features/todos/todosSlice";
import type { Priority } from "@/types/todo";
import { cn } from "@/lib/cn";
import { todayISO } from "@/lib/date";

export function TodoInput() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState<string>("");
  const [expanded, setExpanded] = useState(false);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    dispatch(addTodo({ content: trimmed, priority, dueDate: dueDate || null }));
    setValue("");
    setDueDate("");
    setPriority("medium");
    setExpanded(false);
  };

  return (
    <div className="glass rounded-2xl p-3 sm:p-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setExpanded(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
            if (e.key === "Escape") {
              setValue("");
              setExpanded(false);
            }
          }}
          placeholder="What needs to be done?"
          className="flex-1 bg-transparent outline-none text-base placeholder:text-[var(--fg-muted)]"
          aria-label="New todo"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!value.trim()}
          className={cn(
            "shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium text-sm transition-all focus-ring",
            value.trim()
              ? "bg-[var(--accent)] text-[var(--accent-fg)] hover:opacity-90"
              : "bg-[var(--bg-muted)] text-[var(--fg-muted)] cursor-not-allowed",
          )}
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      {expanded && (
        <div className="mt-3 flex flex-wrap items-center gap-2 animate-slide-in">
          <div className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-muted)]">
            <Flag className="h-3.5 w-3.5" />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1 focus-ring"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs text-[var(--fg-muted)]">
            <Calendar className="h-3.5 w-3.5" />
            <input
              type="date"
              value={dueDate}
              min={todayISO()}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1 focus-ring"
            />
          </div>
          <span className="ml-auto text-xs text-[var(--fg-muted)]">
            Press Enter to add · Esc to clear
          </span>
        </div>
      )}
    </div>
  );
}
