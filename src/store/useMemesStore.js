import { invoke } from "@tauri-apps/api";
import { create } from "zustand";

export const useMemesStore = create(set => ({
  memes: [],
  setMemes: memes => set({ memes }),
  getMemes: async () => {
    return await invoke("get_memes");
  },
  insertMeme: async meme => {
    // validation
    if (!meme.name || !meme.url) return;
    return await invoke("insert_meme", { meme });
  },
  removeMeme: async id => {
    // validation
    if (id < 1) return;
    return await invoke("delete_meme", { id });
  },
  updateMeme: async meme => {
    return await invoke("update_meme", { meme });
  },
  searchMemes: async query => {
    return await invoke("search", { query });
  },
}));
