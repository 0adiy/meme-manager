import { useMemesStore } from "../store/useMemesStore";
import { useMemeFormStore } from "../store/useMemeFormStore";
import { PlusIcon } from "@heroicons/react/24/outline";
import { open } from "@tauri-apps/api/dialog";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import brokenImage from "../assets/brokenIMage.svg";
import { invoke } from "@tauri-apps/api";

export default function MemeForm() {
  const { insertMeme } = useMemesStore();
  const {
    name,
    url,
    description,
    tags,
    localPath,
    filetype,
    setName,
    setUrl,
    setDescription,
    setTags,
    setLocalPath,
    setFiletype,
    reset,
  } = useMemeFormStore();

  const handleOnSubmit = e => {
    e.preventDefault();
    const meme = {
      name: name,
      url: url,
      description: description,
      tags: tags,
      local_path: localPath,
      filetype: "image", // TODO - add input
    };
    console.log(meme);
    insertMeme(meme);
    reset();
    // close modal
    document.getElementById("add_meme_modal").close();
  };

  const handelFileOpen = async e => {
    const filePath = await open({
      multiple: false,
      filters: [
        {
          name: "Images",
          extensions: [
            "jpg",
            "png",
            "jpeg",
            "gif",
            "webp",
            "heic",
            "tiff",
            "bmp",
          ],
        },
        {
          name: "Video",
          extensions: [
            "mp4",
            "webm",
            "mov",
            "avi",
            "mkv",
            "flv",
            "ogv",
            "wmv",
            "mpg",
            "mpeg",
          ],
        },
      ],
    });
    setLocalPath(filePath);
  };

  return (
    <>
      <div className='tooltip-bottom tooltip' data-tip='Add Meme'>
        <button
          className='btn btn-primary mx-4'
          onClick={() => document.getElementById("add_meme_modal").showModal()}
        >
          <PlusIcon className='size-5' />
        </button>
      </div>
      <dialog id='add_meme_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mb-4'>Meme Form</h3>

          <form action='' className='flex flex-col gap-2'>
            <div className='flex flex-col w-full lg:flex-row'>
              {/* left side */}
              <div className='flex flex-col flex-grow gap-2'>
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
                  className='input input-bordered w-full text-base'
                />
                <textarea
                  className='textarea textarea-bordered textarea-xs w-full text-base px-3'
                  placeholder='Tags (Comma separated)'
                  onChange={e => setTags(e.target.value)}
                  value={tags}
                  id='tags'
                  rows='2'
                />{" "}
                <textarea
                  className='textarea textarea-bordered textarea-xs w-full text-base px-3'
                  placeholder='Description'
                  onChange={e => setDescription(e.target.value)}
                  value={description}
                  id='description'
                  rows='3'
                />
              </div>
              {/* divider */}
              <div className='divider lg:divider-horizontal'></div>
              {/* right side */}
              <div className='flex flex-col lg:w-40 gap-2'>
                <img
                  className='w-full bg-base-300 rounded-btn flex-grow object-cover'
                  src={convertFileSrc(localPath)}
                  onError={e => {
                    e.target.src = brokenImage;
                  }}
                  alt='preview'
                />
                <input
                  type='button'
                  className='btn btn-neutral w-full'
                  onClick={handelFileOpen}
                  value={"Select File"}
                />
                <label className='label cursor-pointer mx-auto w-fit gap-2'>
                  <span className='label-text'>Image</span>
                  <input
                    type='checkbox'
                    className='toggle'
                    onChange={e =>
                      filetype === "image"
                        ? setFiletype("video")
                        : setFiletype("image")
                    }
                    checked={filetype === "video"}
                  />
                  <span className='label-text'>Video</span>
                </label>
              </div>
            </div>
            <p>Local Path:</p>
            <a
              className='link link-accent font-mono break-all line-clamp-1'
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                invoke("show_in_folder", { path: localPath });
              }}
            >
              {localPath}
            </a>
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
