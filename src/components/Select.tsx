import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
}

export function Select({ value, options, onChange, ariaLabel, className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 py-1.5 text-xs focus-ring hover:bg-[var(--bg-muted)] transition-colors"
      >
        <span>{selected?.label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-[var(--fg-muted)] transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1.5 min-w-[140px] rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-1 shadow-lg animate-slide-in"
        >
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  setOpen(false);
                  onChange(opt.value);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-xs transition-colors focus-ring",
                  opt.value === value
                    ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "text-[var(--fg)] hover:bg-[var(--bg-muted)]",
                )}
              >
                <span>{opt.label}</span>
                {opt.value === value && <Check className="h-3.5 w-3.5" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
