export type Priority = "low" | "medium" | "high";

export type Filter = "all" | "active" | "completed";

export type Sort = "newest" | "oldest" | "priority" | "due";

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
  priority: Priority;
  dueDate: string | null;
  createdAt: number;
}

export interface TodosState {
  items: Todo[];
  filter: Filter;
  search: string;
  sort: Sort;
  deleted: Todo | null;
}
