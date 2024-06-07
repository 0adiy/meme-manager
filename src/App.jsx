import GridView from "./layouts/GridView.jsx";
import ListView from "./layouts/ListView.jsx";
import { useEffect, useState } from "react";
import { useMemesStore } from "./store/useMemesStore.js";
import Navbar from "./layouts/Navbar.jsx";
import { Pagination } from "./layouts/Pagination.jsx";
import DeleteDialog from "./layouts/DeleteDialog.jsx";
import MemeFormModal from "./layouts/MemeFormModal.jsx";
import { usePreferenceStore } from "./store/usePreferenceStore.js";

function App() {
  const { theme, viewMode } = usePreferenceStore();
  const { getMemes, memes } = useMemesStore();

  useEffect(() => {
    getMemes();
  }, []);

  return (
    <div
      className='pb-4 w-full min-h-screen bg-base-300 flex flex-col justify-start items-center space-y-2'
      data-theme={theme}
    >
      <Navbar />
      {viewMode === "grid" ? (
        <GridView items={memes} />
      ) : (
        <ListView items={memes} />
      )}
      {/* Opens when needed, but need to be always available in html */}
      <DeleteDialog />
      <MemeFormModal />

      <Pagination />
    </div>
  );
}

export default App;
