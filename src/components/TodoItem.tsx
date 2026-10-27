import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Pencil, Trash2, Flag, Calendar } from "lucide-react";
import { useAppDispatch } from "@/hooks/redux";
import { toggleTodo, deleteTodo, editTodo, setPriority, setDueDate } from "@/features/todos/todosSlice";
import type { Todo, Priority } from "@/types/todo";
import { cn } from "@/lib/cn";
import { isOverdue, formatDue } from "@/lib/date";
import { Select } from "./Select";

const priorityStyles: Record<Priority, string> = {
  low: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
  medium: "text-amber-500 bg-amber-500/10 border-amber-500/30",
  high: "text-rose-500 bg-rose-500/10 border-rose-500/30",
};

const priorityLabel: Record<Priority, string> = {
  low: "Low",
  medium: "Med",
  high: "High",
};

interface Props {
  todo: Todo;
}

export function TodoItem({ todo }: Props) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.content);
  const [showMeta, setShowMeta] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    setDraft(todo.content);
  }, [todo.content]);

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== todo.content) {
      dispatch(editTodo({ id: todo.id, content: trimmed }));
    } else {
      setDraft(todo.content);
    }
    setEditing(false);
  };

  const overdue = isOverdue(todo.dueDate, todo.completed);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={cn(
        "group glass rounded-xl p-3 sm:p-4 flex flex-col gap-2",
        todo.completed && "todo-done",
        overdue && "ring-1 ring-rose-500/40",
      )}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleTodo(todo.id))}
          aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
          className={cn(
            "mt-0.5 h-5 w-5 shrink-0 rounded-md border flex items-center justify-center transition-all focus-ring",
            todo.completed
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-[var(--border)] hover:border-[var(--accent)]",
          )}
        >
          {todo.completed && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitEdit();
                if (e.key === "Escape") {
                  setDraft(todo.content);
                  setEditing(false);
                }
              }}
              className="w-full bg-transparent border-b border-[var(--accent)] outline-none text-base py-0.5"
            />
          ) : (
            <p
              onDoubleClick={() => setEditing(true)}
              className="todo-text break-words text-base leading-snug cursor-text select-none"
            >
              {todo.content}
            </p>
          )}

          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border",
                priorityStyles[todo.priority],
              )}
            >
              <Flag className="h-3 w-3" />
              {priorityLabel[todo.priority]}
            </span>
            {todo.dueDate && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border",
                  overdue
                    ? "text-rose-500 bg-rose-500/10 border-rose-500/30"
                    : "text-[var(--fg-muted)] bg-[var(--bg-muted)] border-[var(--border)]",
                )}
              >
                <Calendar className="h-3 w-3" />
                {formatDue(todo.dueDate)}
                {overdue && " · overdue"}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => setShowMeta((v) => !v)}
            aria-label="Edit metadata"
            className="p-1.5 rounded-lg hover:bg-[var(--bg-muted)] text-[var(--fg-muted)] focus-ring"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => dispatch(deleteTodo(todo.id))}
            aria-label="Delete todo"
            className="p-1.5 rounded-lg hover:bg-rose-500/10 text-rose-500 focus-ring"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showMeta && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="flex flex-wrap items-center gap-2 pl-8 pt-1"
        >
          <label className="text-xs text-[var(--fg-muted)]">Priority</label>
          <Select
            value={todo.priority}
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
            onChange={(v) => dispatch(setPriority({ id: todo.id, priority: v as Priority }))}
            ariaLabel="Priority"
          />
          <label className="text-xs text-[var(--fg-muted)] ml-2">Due</label>
          <input
            type="date"
            value={todo.dueDate ?? ""}
            onChange={(e) => dispatch(setDueDate({ id: todo.id, dueDate: e.target.value || null }))}
            className="text-xs rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1 focus-ring"
          />
          <button
            type="button"
            onClick={() => setShowMeta(false)}
            className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] ml-auto"
          >
            Done
          </button>
        </motion.div>
      )}
    </motion.li>
  );
}
