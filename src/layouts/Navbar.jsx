import { TableCellsIcon, QueueListIcon } from "@heroicons/react/24/outline";
import About from "./About.jsx";
import SearchBox from "../components/SearchBox.jsx";
import MemeForm from "../components/AddMemeButton.jsx";

export default function Navbar({ view, setView }) {
  return (
    <div className='navbar bg-neutral sticky top-0 z-10'>
      <About />
      <SearchBox />
      <MemeForm />
      <ul className='menu menu-horizontal bg-base-200 rounded-box'>
        <li>
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            <QueueListIcon className='size-6' />
          </button>
        </li>
        <li>
          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            <TableCellsIcon className='size-6' />
          </button>
        </li>
      </ul>
    </div>
  );
}
