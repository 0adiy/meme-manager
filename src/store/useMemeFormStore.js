import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const setup = (set, get) => ({
  name: "",
  setName: name => set({ name }),
  url: "",
  setUrl: url => set({ url }),
  description: "",
  setDescription: description => set({ description }),
  tags: [],
  setTags: t => set({ tags: t.split(",") }),
  localPath: "",
  setLocalPath: localPath => set({ localPath }),
  filetype: "image",
  setFiletype: filetype => set({ filetype }),
  reset: () => set({ name: "", url: "", description: "", tags: [] }),
});

export const useMemeFormStore = create(
  persist(setup, {
    name: "add-meme-store",
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  })
);
