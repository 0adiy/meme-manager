import GridView from "./layouts/GridView.jsx";
import ListView from "./layouts/ListView.jsx";
import { useEffect, useState } from "react";
import { useMemesStore } from "./store/useMemesStore.js";
import MemeForm from "./components/MemeForm.jsx";
import Navbar from "./layouts/Navbar.jsx";

const items = [
  {
    id: 1,
    title: "The Godfather",
    year: 1972,
    rating: 1.5,
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    id: 2,
    title: "The Godfather: Part II",
    year: 1974,
    rating: 3.0,
    description:
      "The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate.",
    poster:
      "https://www4.yts.nz/assets/images/movies/The_Godfather_Part_II_1974/large-cover.jpg",
  },
  {
    id: 3,
    title: "The Godfather: Part III",
    year: 1990,
    rating: 3.5,
    description:
      "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York.",
    poster:
      "https://www4.yts.nz/assets/images/movies/The_Godfather_Part_III_1990/large-cover.jpg",
  },
  {
    id: 4,
    title: "The Dark Knight",
    year: 2008,
    rating: 4.5,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
  },
  {
    id: 5,
    title: "The Dark Knight Rises",
    year: 2012,
    rating: 4.0,
    description:
      "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City from the brutal guerrera of the Joker.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg",
  },
  {
    id: 6,
    title: "Atomic Blonde",
    year: 2021,
    rating: 3.0,
    description:
      "A mysterious young woman, on a quest to save her family from the dark side of the law, discovers that she is the inner woman of the mysterious organization she works for.",
    poster:
      "https://www4.yts.nz/assets/images/movies/atomic_blonde_2017/medium-cover.jpg",
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    rating: 4.0,
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
];

function App() {
  // async function greet() {
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  const [view, setView] = useState("list");
  const { getMemes, memes, setMemes } = useMemesStore();

  useEffect(() => {
    getMemes().then(setMemes);
  }, []);

  return (
    <div
      className='w-screen h-screen bg-base-300 flex flex-col justify-start items-center space-y-2'
      // data-theme='business'
      // data-theme='synthwave'
    >
      <Navbar setView={setView} view={view} />
      {view === "list" && <ListView items={memes} />}
      {view === "grid" && <GridView items={memes} />}
    </div>
  );
}

export default App;
