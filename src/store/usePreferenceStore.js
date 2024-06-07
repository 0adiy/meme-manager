import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const setup = set => ({
  theme: "dark",
  setTheme: theme => set({ theme }),
  viewMode: "grid",
  setListMode: () => set({ viewMode: "list" }),
  setGridMode: () => set({ viewMode: "grid" }),
});

export const usePreferenceStore = create(
  persist(setup, {
    name: "preference-store",
    storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
  })
);
