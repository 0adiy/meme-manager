import { invoke } from "@tauri-apps/api";
import { create } from "zustand";

export const useMemesStore = create((set, get) => ({
  memes: [],
  setMemes: memes => set({ memes }),
  getMemes: async () => set({ memes: await invoke("get_memes") }),
  insertMeme: async meme => {
    await invoke("insert_meme", { meme });
    set({ memes: await invoke("get_memes") });
  },
  removeMeme: async id => {
    if (id < 1) return;
    await invoke("delete_meme", { id: id.toString() });
    set({ memes: await invoke("get_memes") });
  },
  updateMeme: async (id, newMeme) => {
    const oldMeme = await invoke("get_meme", { id: `${id}` });
    const meme = { ...oldMeme, ...newMeme };
    await invoke("update_meme", { meme });
    set({ memes: await invoke("get_memes") });
  },
  searchMemes: async () => {
    set({
      memes: await invoke("search", {
        query: get().query,
        limit: get().limit,
        offset: get().offset,
        order_by: get().order_by || "date",
      }),
    });
  },
  query: "",
  setQuery: query => set({ query }),
  limit: 10,
  setLimit: limit => set({ limit }),
  offset: 0,
  setOffset: offset => set({ offset }),
  getcount: async () => await invoke("count_memes"),
}));
