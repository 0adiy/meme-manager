import { TableCellsIcon, QueueListIcon } from "@heroicons/react/24/outline";
import About from "./About.jsx";
import SearchBox from "../components/SearchBox.jsx";
import MemeForm from "../components/AddMemeButton.jsx";
import { usePreferenceStore } from "../store/usePreferenceStore.js";

export default function Navbar() {
  const { viewMode, setListMode, setGridMode } = usePreferenceStore();
  return (
    <div className='navbar bg-base-100 sticky top-0 z-10'>
      <img src='/icon.png' className='size-9' />
      <p className='hidden md:block text-xl font-bold mx-4'>Meme Manager</p>
      <div className='mx-auto'>
        <SearchBox />
      </div>
      <MemeForm />
      <div className='join'>
        <button
          className={`btn join-item ${viewMode === "list" && "btn-active"}`}
          onClick={setListMode}
        >
          <QueueListIcon className='size-6' />
        </button>
        <button
          // className={viewMode === "grid" ? "active" : ""}
          className={`btn join-item ${viewMode === "grid" && "btn-active"}`}
          onClick={setGridMode}
        >
          <TableCellsIcon className='size-6' />
        </button>
      </div>{" "}
      <About />
    </div>
  );
}
