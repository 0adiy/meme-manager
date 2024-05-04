import { useMemesStore } from "../store/useMemesStore";
import { useMemeFormStore } from "../store/useMemeFormStore";

export default function MemeForm() {
  const { insertMeme } = useMemesStore();
  const {
    name,
    url,
    description,
    tags,
    setName,
    setUrl,
    setDescription,
    setTags,
    reset,
  } = useMemeFormStore();

  const handleOnSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    insertMeme({
      name: name,
      url: url,
      description: description,
      tags: tags,
    });
  };
  return (
    <>
      <button
        className='btn btn-primary'
        onClick={() => document.getElementById("add_meme_modal").showModal()}
      >
        Add Meme
      </button>
      <dialog id='add_meme_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mb-4'>Meme Form</h3>

          <form action='' className='flex flex-col gap-2'>
            <input
              type='text'
              placeholder='Name'
              id='name'
              onChange={e => setName(e.target.value)}
              value={name}
              className='input input-bordered w-full text-base'
            />

            <input
              type='text'
              id='url'
              placeholder='Url'
              onChange={e => setUrl(e.target.value)}
              value={url}
              className='input input-bordered w-full  text-base'
            />
            <textarea
              className='textarea textarea-bordered textarea-xs w-full text-base px-3'
              placeholder='Description'
              onChange={e => setDescription(e.target.value)}
              value={description}
              id='description'
            />
            <textarea
              className='textarea textarea-bordered textarea-xs w-full text-base px-3'
              placeholder='Tags (Comma separated)'
              onChange={e => setTags(e.target.value)}
              value={tags}
              id='tags'
            />

            <div className='modal-action flex'>
              <button className='btn btn-primary' onClick={handleOnSubmit}>
                Submit
              </button>
              <button
                className='btn'
                type='button'
                onClick={e => {
                  e.preventDefault();
                  document.getElementById("add_meme_modal").close();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
