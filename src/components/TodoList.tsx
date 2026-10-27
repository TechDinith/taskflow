import { useMemo } from "react";
import { useAppSelector } from "@/hooks/redux";
import { TodoItem } from "./TodoItem";
import { EmptyState } from "./EmptyState";
import type { Todo, Filter, Sort } from "@/types/todo";

const priorityRank: Record<Todo["priority"], number> = { high: 0, medium: 1, low: 2 };

function applyFilter(items: Todo[], filter: Filter, search: string): Todo[] {
  let out = items;
  if (filter === "active") out = out.filter((t) => !t.completed);
  if (filter === "completed") out = out.filter((t) => t.completed);
  const q = search.trim().toLowerCase();
  if (q) out = out.filter((t) => t.content.toLowerCase().includes(q));
  return out;
}

function applySort(items: Todo[], sort: Sort): Todo[] {
  const copy = [...items];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => b.createdAt - a.createdAt);
    case "oldest":
      return copy.sort((a, b) => a.createdAt - b.createdAt);
    case "priority":
      return copy.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
    case "due":
      return copy.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    default:
      return copy;
  }
}

export function TodoList() {
  const { items, filter, search, sort } = useAppSelector((s) => s.todos);

  const visible = useMemo(() => {
    const filtered = applyFilter(items, filter, search);
    return applySort(filtered, sort);
  }, [items, filter, search, sort]);

  if (visible.length === 0) {
    const noItems = items.length === 0;
    let title = "All caught up";
    let description = "Add a task above to get started.";
    if (!noItems) {
      if (search.trim()) {
        title = "No matches";
        description = `Nothing matches “${search.trim()}”.`;
      } else if (filter === "completed") {
        title = "No completed todos";
        description = "Complete a task to see it here.";
      } else if (filter === "active") {
        title = "No active todos";
        description = "All tasks are done — nice work!";
      } else {
        title = "No matching todos";
        description = "Try a different filter.";
      }
    }
    return (
      <EmptyState
        filtered={!noItems}
        title={title}
        description={description}
      />
    );
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {visible.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
