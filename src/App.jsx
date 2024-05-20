import GridView from "./layouts/GridView.jsx";
import ListView from "./layouts/ListView.jsx";
import { useEffect, useState } from "react";
import { useMemesStore } from "./store/useMemesStore.js";
import Navbar from "./layouts/Navbar.jsx";

function App() {
  const [view, setView] = useState("list");
  const { getMemes, memes } = useMemesStore();

  useEffect(() => {
    getMemes();
  }, []);

  return (
    <div
      className='w-full min-h-screen bg-base-300 flex flex-col justify-start items-center space-y-2'
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
