import { useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import GridView from "./layouts/GridView.jsx";
import { useHotkeys } from "react-hotkeys-hook";

const items = [
  {
    id: 1,
    title: "The Godfather",
    year: 1972,
    rating: 1.5,
    poster:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    id: 2,
    title: "The Godfather: Part II",
    year: 1974,
    rating: 3.0,
    poster:
      "https://www4.yts.nz/assets/images/movies/The_Godfather_Part_II_1974/large-cover.jpg",
  },
  {
    id: 3,
    title: "The Godfather: Part III",
    year: 1990,
    rating: 3.5,
    poster:
      "https://www4.yts.nz/assets/images/movies/The_Godfather_Part_III_1990/large-cover.jpg",
  },
  {
    id: 4,
    title: "The Dark Knight",
    year: 2008,
    rating: 4.5,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
  },
  {
    id: 5,
    title: "The Dark Knight Rises",
    year: 2012,
    rating: 4.0,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg",
  },
  {
    id: 6,
    title: "Atomic Blonde",
    year: 2021,
    rating: 3.0,
    poster:
      "https://www4.yts.nz/assets/images/movies/atomic_blonde_2017/medium-cover.jpg",
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    rating: 4.0,
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
];

function App() {
  const [term, setTerm] = useState("");
  const inputRef = useRef(null);

  useHotkeys("ctrl+k", e => {
    e.preventDefault();
    inputRef.current.focus();
  });

  // async function greet() {
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  async function search() {
    setTerm(await invoke("search", { term }));
  }

  return (
    <div className='flex flex-col justify-center items-center space-y-2'>
      <form
        className='my-2 flex items-center gap-2'
        onSubmit={e => {
          e.preventDefault();
          search(e.target.value);
        }}
      >
        {/* TODO - add focus on Ctrl+K */}
        <label className='input input-bordered flex items-center gap-2'>
          <input
            ref={inputRef}
            type='text'
            className='grow'
            placeholder='Search'
          />
          <kbd className='kbd kbd-sm'>⌘</kbd>
          <kbd className='kbd kbd-sm'>K</kbd>
        </label>
        <button type='submit' className='btn btn-primary'>
          Search
        </button>
      </form>
      <GridView items={items} />
    </div>
  );
}

export default App;
