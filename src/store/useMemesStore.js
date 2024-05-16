import { invoke } from "@tauri-apps/api";
import { create } from "zustand";

export const useMemesStore = create((set, get) => ({
  memes: [],
  setMemes: memes => set({ memes }),
  getMemes: async () => set({ memes: await invoke("get_memes") }),
  insertMeme: async meme =>
    set({ memes: await invoke("insert_meme", { meme }) }),
  removeMeme: async id => {
    if (id < 1) return;
    await invoke("delete_meme", { id: id.toString() });
    set({ memes: await invoke("get_memes") });
  },
  updateMeme: async newMeme => {
    const oldMeme = await invoke("get_meme", { id: `${newMeme.id}` });
    const meme = { ...oldMeme, ...newMeme };
    meme.id = `${meme.id}`;
    await invoke("update_meme", { meme });
    set({ memes: await invoke("get_memes") });
  },
  searchMemes: async () => {
    set({ memes: await invoke("search", { query: get().query }) });
  },
  query: "",
  setQuery: query => set({ query }),
}));
