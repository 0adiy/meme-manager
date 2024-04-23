import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import GridView from "./layouts/GridView.jsx";

const items = [
  {
    id: 1,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    poster:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    id: 2,
    title: "The Godfather: Part II",
    year: 1974,
    rating: 9.0,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyYjMtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
  },
];

function App() {
  const [term, setTerm] = useState("");

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
          <input type='text' className='grow' placeholder='Search' />
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
