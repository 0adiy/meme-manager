import { create } from "zustand";

export const useDeleteStore = create((set, get) => ({
  memeToDelete: null,
  setMemeToDelete: meme => set({ memeToDelete: meme }),
  resetMemeToDelete: () => set({ memeToDelete: null }),
}));
