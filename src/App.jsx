import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [term, setTerm] = useState("");

  // async function greet() {
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  async function search() {
    setTerm(await invoke("search", { term }));
  }

  return (
    <div className='flex flex-col justify-center items-center space-y-8'>
      <form
        onSubmit={e => {
          e.preventDefault();
          search(e.target.value);
        }}
      >
        <input
          id='greet-input'
          onChange={e => setTerm(e.currentTarget.value)}
          placeholder='Search ...'
        />
        <button type='submit' className='bg-blue-600 hover:bg-blue-700'>
          Search
        </button>
      </form>
    </div>
  );
}

export default App;
