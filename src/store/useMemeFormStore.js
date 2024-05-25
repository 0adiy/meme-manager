import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const setup = (set, get) => ({
  id: 0,
  setId: id => set({ id }),
  name: "",
  setName: name => set({ name }),
  url: "",
  setUrl: url => set({ url }),
  description: "",
  setDescription: description => set({ description }),
  tags: [],
  setTags: tags => set({ tags }),
  localPath: "",
  setLocalPath: localPath => set({ localPath }),
  filetype: "image",
  setFiletype: filetype => set({ filetype }),
  reset: () =>
    set({
      name: "",
      url: "",
      description: "",
      tags: [],
      localPath: "",
      filetype: "image",
    }),
  mode: "add",
  setModeAdd: () => set({ mode: "add" }),
  setModeUpdate: () => set({ mode: "update" }),
});

export const useMemeFormStore = create(
  persist(setup, {
    name: "add-meme-store",
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  })
);
