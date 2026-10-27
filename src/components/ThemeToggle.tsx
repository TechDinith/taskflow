import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";


export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-muted)] transition-colors focus-ring"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-500" />
      )}
    </button>
  );
}
