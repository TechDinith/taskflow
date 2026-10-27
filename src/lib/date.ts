export function isOverdue(dueDate: string | null, completed: boolean): boolean {
  if (!dueDate || completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
}

export function formatDue(dueDate: string | null): string {
  if (!dueDate) return "";
  const due = new Date(dueDate);
  return due.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function todayISO(): string {
  const d = new Date();
  const tz = d.getTimezoneOffset();
  const local = new Date(d.getTime() - tz * 60000);
  return local.toISOString().slice(0, 10);
}
