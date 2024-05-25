import { useThemeStore } from "../store/useThemeStore";

const About = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <>
      <button
        className='btn btn-ghost normal-case text-xl'
        onClick={() => document.getElementById("about_modal").showModal()}
      >
        Meme Manager
      </button>
      <dialog id='about_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>About</h3>
          <p className='py-4'>
            A beautiful meme manager developed by an equally beautiful
            developer. Focusing on performance and UI with Rust and Tauri. Made
            in India by{" "}
            <a className='link link-primary' href='https://github.com/0adiy'>
              0adiy
            </a>{" "}
            with {"<3"}
          </p>
          <div className='modal-action'>
            <div className='join mr-auto'>
              <input
                type='radio'
                name='theme-buttons'
                className='btn theme-controller join-item'
                aria-label='Dark'
                value='dark'
                checked={theme === "dark"}
                onClick={() => setTheme("dark")}
              />
              <input
                type='radio'
                name='theme-buttons'
                className='btn theme-controller join-item'
                aria-label='synthwave'
                value='synthwave'
                checked={theme === "synthwave"}
                onClick={() => setTheme("synthwave")}
              />
              <input
                type='radio'
                name='theme-buttons'
                className='btn theme-controller join-item'
                aria-label='business'
                value='business'
                checked={theme === "business"}
                onClick={() => setTheme("business")}
              />
            </div>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default About;
