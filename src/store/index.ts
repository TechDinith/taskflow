import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "@/features/todos/todosSlice";
import { STORAGE_KEY } from "@/features/todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persist a subset of state to localStorage.
let saveTimer: ReturnType<typeof setTimeout> | null = null;
store.subscribe(() => {
  const state = store.getState().todos;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      const payload = {
        items: state.items,
        filter: state.filter,
        search: state.search,
        sort: state.sort,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota errors */
    }
  }, 250);
});
