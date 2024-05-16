import { useMemesStore } from "../store/useMemesStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef, useEffect } from "react";

function SearchBox() {
  const { searchMemes, query, setQuery } = useMemesStore();
  const inputRef = useRef(null);

  // Shortcut to search `Ctrl+K`
  const handleKeyDown = e => {
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <form className='flex items-center gap-2 flex-1 justify-center'>
      <label className='input input-bordered flex items-center gap-2  bg-base-300'>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
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
          searchMemes(query);
        }}
      >
        <MagnifyingGlassIcon className='size-4' />
      </button>
    </form>
  );
}

export default SearchBox;
