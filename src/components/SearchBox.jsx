import { useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { useHotkeys } from "react-hotkeys-hook";
import { useMemesStore } from "../store/useMemesStore";

function SearchBox() {
  const inputRef = useRef(null);
  const { searchMemes, setMemes } = useMemesStore();

  useHotkeys("ctrl+k", e => {
    e.preventDefault();
    inputRef.current.focus();
  });

  return (
    <form
      className='my-2 flex items-center gap-2 flex-1 justify-center'
      onSubmit={e => {
        e.preventDefault();
        search(e.target.value);
      }}
    >
      <label className='input input-bordered flex items-center gap-2  bg-base-300'>
        <input
          ref={inputRef}
          type='text'
          className='grow'
          placeholder='Search'
        />
        <kbd className='kbd kbd-sm'>⌘</kbd>
        <kbd className='kbd kbd-sm'>K</kbd>
      </label>
      <button
        type='submit'
        className='btn btn-primary'
        onClick={e => {
          e.preventDefault();
          searchMemes(inputRef.current.value).then(setMemes);
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBox;
