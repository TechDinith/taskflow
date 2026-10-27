import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TodosState, Todo, Filter, Sort, Priority } from "@/types/todo";

const STORAGE_KEY = "my-todo-app:v1";

function loadInitial(): TodosState {
  if (typeof window === "undefined") {
    return { items: [], filter: "all", search: "", sort: "newest", deleted: null };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<TodosState>;
      return {
        items: Array.isArray(parsed.items) ? parsed.items : [],
        filter: parsed.filter ?? "all",
        search: parsed.search ?? "",
        sort: parsed.sort ?? "newest",
        deleted: null,
      };
    }
  } catch {
    /* ignore */
  }
  return {
    items: [
      { id: crypto.randomUUID(), content: "Buy some milk", completed: false, priority: "medium", dueDate: null, createdAt: Date.now() - 1000 },
      { id: crypto.randomUUID(), content: "Play a game", completed: false, priority: "low", dueDate: null, createdAt: Date.now() },
    ],
    filter: "all",
    search: "",
    sort: "newest",
    deleted: null,
  };
}

const initialState: TodosState = loadInitial();

const slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ content: string; priority: Priority; dueDate: string | null }>) => {
      const todo: Todo = {
        id: crypto.randomUUID(),
        content: action.payload.content.trim(),
        completed: false,
        priority: action.payload.priority,
        dueDate: action.payload.dueDate,
        createdAt: Date.now(),
      };
      state.items.unshift(todo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const t = state.items.find((x) => x.id === action.payload);
      if (t) t.completed = !t.completed;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const idx = state.items.findIndex((x) => x.id === action.payload);
      if (idx !== -1) {
        state.deleted = state.items[idx];
        state.items.splice(idx, 1);
      }
    },
    undoDelete: (state) => {
      if (state.deleted) {
        state.items.unshift(state.deleted);
        state.deleted = null;
      }
    },
    clearDeleted: (state) => {
      state.deleted = null;
    },
    editTodo: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const t = state.items.find((x) => x.id === action.payload.id);
      if (t) t.content = action.payload.content.trim();
    },
    setPriority: (state, action: PayloadAction<{ id: string; priority: Priority }>) => {
      const t = state.items.find((x) => x.id === action.payload.id);
      if (t) t.priority = action.payload.priority;
    },
    setDueDate: (state, action: PayloadAction<{ id: string; dueDate: string | null }>) => {
      const t = state.items.find((x) => x.id === action.payload.id);
      if (t) t.dueDate = action.payload.dueDate;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((t) => !t.completed);
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    importTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  undoDelete,
  clearDeleted,
  editTodo,
  setPriority,
  setDueDate,
  clearCompleted,
  setFilter,
  setSearch,
  setSort,
  importTodos,
} = slice.actions;

export default slice.reducer;

export { STORAGE_KEY };
