import { useEffect } from "react";
import { Undo2, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { undoDelete, clearDeleted } from "@/features/todos/todosSlice";


export function UndoToast() {
  const dispatch = useAppDispatch();
  const deleted = useAppSelector((s) => s.todos.deleted);

  useEffect(() => {
    if (!deleted) return;
    const t = setTimeout(() => dispatch(clearDeleted()), 4500);
    return () => clearTimeout(t);
  }, [deleted, dispatch]);

  if (!deleted) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 animate-slide-in">
      <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
        <span className="text-sm">Deleted “{deleted.content}”</span>
        <button
          type="button"
          onClick={() => dispatch(undoDelete())}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:opacity-80 focus-ring rounded-lg px-2 py-1"
        >
          <Undo2 className="h-4 w-4" />
          Undo
        </button>
        <button
          type="button"
          onClick={() => dispatch(clearDeleted())}
          aria-label="Dismiss"
          className="p-1 rounded-lg hover:bg-[var(--bg-muted)] text-[var(--fg-muted)] focus-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
