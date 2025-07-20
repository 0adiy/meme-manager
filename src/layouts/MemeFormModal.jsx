import { useMemesStore } from "../store/useMemesStore";
import { useMemeFormStore } from "../store/useMemeFormStore";
import { open } from "@tauri-apps/api/dialog";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import brokenImage from "../assets/brokenImage.svg";
import { invoke } from "@tauri-apps/api";

export default function MemeFormModal() {
  const { insertMeme, updateMeme } = useMemesStore();
  const {
    id,
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
    mode,
  } = useMemeFormStore();

  const handleOnSubmit = e => {
    e.preventDefault();
    // TODO - validation and check insert or update
    const meme = {
      name: name,
      url: url,
      description: description,
      tags: tags,
      local_path: localPath,
      filetype: filetype,
    };
    console.log(meme);
    if (mode === "add") insertMeme(meme);
    if (mode === "update") updateMeme(id, meme);
    reset();
    // close modal
    document.getElementById("add_or_update_meme_modal").close();
  };

  const handleFileOpen = async e => {
    const imageExtensions = ["jpg", "png", "jpeg", "gif", "webp", "heic", "tiff", "bmp"];
    try {
      const filePath = await open({
        multiple: false,
        filters: [
          {
            name: "Images",
            extensions: imageExtensions,
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
      
      console.log("Selected file:", filePath);
      if(!filePath) {
        console.log("No file selected");
        return;
      }
      
      setLocalPath(filePath);
      const ext = filePath.split(".").pop().toLowerCase();
      console.log("File extension:", ext);
      
      //run ocr only on images
      if (imageExtensions.includes(ext)) {
        console.log("File is an image, running OCR");
        setFiletype("image");
        try {
          console.log("Invoking extract_text_from_image with path:", filePath);
          const text = await invoke("extract_text_from_image", { path: filePath });
          console.log("OCR result received:", text);
          console.log("OCR result type:", typeof text);
          console.log("OCR result length:", text ? text.length : 0);
          
          if (text && text.trim().length > 0) {
            const trimmedText = text.trim();
            console.log("Setting description to:", trimmedText);
            setDescription(trimmedText);
          } else {
            console.log("OCR returned empty or whitespace-only text");
          }
        } catch (error) {
          console.error("OCR failed with error:", error);
          console.error("Error type:", typeof error);
          console.error("Error message:", error.message || error);
        }
      } else {
        setFiletype("video");
      }
    } catch (error) {
      console.error("Failure:", error);
    }
  };

  return (
    <>
      <dialog id='add_or_update_meme_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg mb-4'>
            {mode === "add" ? "Add Meme" : "Update Meme"}
          </h3>

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
                  onChange={e => {
                    const x = e.target.value;
                    if (x.length > 0) {
                      setTags(x.split(","));
                    } else {
                      setTags([]);
                    }
                  }}
                  value={tags}
                  id='tags'
                  rows='2'
                />
                <textarea
                  className='textarea textarea-bordered textarea-xs w-full text-base px-3'
                  placeholder='Description (Auto-filled from OCR)'
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
                  onClick={handleFileOpen}
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
                  document.getElementById("add_or_update_meme_modal").close();
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