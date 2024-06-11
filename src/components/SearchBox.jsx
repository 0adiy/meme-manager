import { useMemesStore } from "../store/useMemesStore";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
    <form>
      <label className='input input-bordered flex items-center gap-2 bg-base-300 w-80'>
        <input
          ref={inputRef}
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            searchMemes(query);
          }}
          type='text'
          className='grow'
          placeholder='Search'
        />
        {!query ? (
          <>
            <kbd className='kbd'>⌘</kbd>
            <kbd className='kbd'>K</kbd>
          </>
        ) : (
          <>
            <button
              className='btn btn-neutral btn-circle btn-sm btn-outline mr-1'
              onClick={e => {
                e.preventDefault();
                if (query) {
                  setQuery("");
                  searchMemes("");
                }
              }}
              disabled={!query}
            >
              <XMarkIcon className='size-4' />
            </button>
          </>
        )}
      </label>
    </form>
  );
}

export default SearchBox;
