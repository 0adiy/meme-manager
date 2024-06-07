import { TableCellsIcon, QueueListIcon } from "@heroicons/react/24/outline";
import About from "./About.jsx";
import SearchBox from "../components/SearchBox.jsx";
import MemeForm from "../components/AddMemeButton.jsx";
import { usePreferenceStore } from "../store/usePreferenceStore.js";

export default function Navbar() {
  const { viewMode, setListMode, setGridMode } = usePreferenceStore();
  return (
    <div className='navbar bg-neutral sticky top-0 z-10'>
      <About />
      <SearchBox />
      <MemeForm />
      <ul className='menu menu-horizontal bg-base-200 rounded-box'>
        <li>
          <button
            className={viewMode === "list" ? "active" : ""}
            onClick={setListMode}
          >
            <QueueListIcon className='size-6' />
          </button>
        </li>
        <li>
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={setGridMode}
          >
            <TableCellsIcon className='size-6' />
          </button>
        </li>
      </ul>
    </div>
  );
}
