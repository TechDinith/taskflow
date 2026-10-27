import { CheckSquare } from "lucide-react";
import { TodoInput } from "@/components/TodoInput";
import { TodoFilters } from "@/components/TodoFilters";
import { TodoList } from "@/components/TodoList";
import { StatsBar } from "@/components/StatsBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UndoToast } from "@/components/UndoToast";

export default function App() {
  return (
    <div className="app-shell">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-500 flex items-center justify-center shadow-lg shadow-[var(--accent)]/30">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Todo</h1>
              <p className="text-xs text-[var(--fg-muted)]">Stay organized, one task at a time.</p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex flex-col gap-4">
          <TodoInput />
          <TodoFilters />
          <StatsBar />
          <TodoList />
        </main>

        <footer className="mt-8 text-center text-xs text-[var(--fg-muted)]">
          Built with React, Redux Toolkit &amp; Tailwind CSS · Data saved locally
        </footer>
      </div>
      <UndoToast />
    </div>
  );
}
