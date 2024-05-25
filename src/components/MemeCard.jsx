import {
  ClipboardDocumentListIcon,
  TrashIcon,
  PencilIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useMemesStore } from "../store/useMemesStore";
import { useMemeFormStore } from "../store/useMemeFormStore";
import brokenImage from "../assets/brokenIMage.svg";
import { invoke } from "@tauri-apps/api";
import VideoPlayer from "./VideoPlayer";
import { useDeleteStore } from "../store/useDeleteStore";
/**
 * @param {{
 *   meme: {
 *     id: number,
 *     name: string,
 *     url: string,
 *     description: string,
 *     tags: string[],
 *   }
 * }} props
 */
function Media({ meme }) {
  let url = meme.url;
  if (meme.local_path) url = convertFileSrc(meme.local_path);
  return (
    <>
      {meme.filetype === "image" ? (
        <img
          className='absolute inset-0 w-full h-full object-contain'
          src={url}
          alt={meme?.name}
          onError={e => {
            e.target.src = brokenImage;
          }}
        />
      ) : (
        <VideoPlayer src={url} />
      )}
    </>
  );
}

function CardActions({ meme }) {
  const {
    setId,
    setName,
    setUrl,
    setLocalPath,
    setFiletype,
    reset,
    setTags,
    setDescription,
    setModeAdd,
    setModeUpdate,
  } = useMemeFormStore();
  const { setMemeToDelete } = useDeleteStore();
  function handleOpenInFolder() {
    meme.local_path && invoke("show_in_folder", { path: meme.local_path });
  }

  function handleCopyUrl() {
    meme.url && navigator.clipboard.writeText(meme.url);
  }

  function handleOpenUpdateModal() {
    reset();
    setId(meme.id);
    setName(meme.name);
    setUrl(meme.url);
    setLocalPath(meme.local_path);
    setFiletype(meme.filetype);
    setTags(meme.tags);
    setDescription(meme.description);
    setModeUpdate();
    document.getElementById("add_or_update_meme_modal").showModal();
  }

  function handelOpenDeleteModal() {
    setMemeToDelete(meme);
  }

  return (
    <div className='card-actions justify-end mt-2'>
      {meme.local_path && (
        <div className='tooltip' data-tip='Open Local'>
          <button className='btn btn-info' onClick={handleOpenInFolder}>
            <ArrowUpIcon className='size-5' />
          </button>
        </div>
      )}
      {meme.url && (
        <div className='tooltip' data-tip='Copy'>
          <button className='btn btn-info' onClick={handleCopyUrl}>
            <ClipboardDocumentListIcon className='size-5' />
          </button>
        </div>
      )}
      <div className='tooltip' data-tip='Update'>
        <button
          className='btn btn-accent btn-outline'
          onClick={handleOpenUpdateModal}
        >
          <PencilIcon className='size-5' />
        </button>
      </div>
      <div className='tooltip' data-tip='Remove'>
        <button
          className='btn btn-error btn-outline'
          onClick={handelOpenDeleteModal}
        >
          <TrashIcon className='size-5' />
        </button>
      </div>
    </div>
  );
}

function MemeCardList({ meme }) {
  const { searchMemes, setQuery } = useMemesStore();
  return (
    <div className='card bg-base-100 shadow-xl min-h-10 card-side'>
      <div className='w-40 m-2 block overflow-hidden relative rounded-box shrink-0'>
        <Media meme={meme} />
      </div>
      <div className='card-body'>
        <div className='tooltip tooltip-top w-fit' data-tip={meme?.name}>
          <h2 className='card-title line-clamp-1 text-left'>{meme?.name}</h2>
        </div>

        <p className='line-clamp-3'>{meme?.description}</p>

        <div className='max-w-[calc(100vw-16rem)] flex gap-1 overflow-x-auto'>
          {meme?.tags.map((tag, i) => (
            <span
              key={i}
              className='badge hover:badge-outline [&:not(:hover)]:badge-accent cursor-pointer'
              onClick={() => {
                setQuery(tag);
                searchMemes(tag);
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <CardActions meme={meme} />
      </div>
    </div>
  );
}

function MemeCardGrid({ meme }) {
  const { searchMemes, setQuery } = useMemesStore();
  return (
    <div className='card bg-base-100 shadow-xl min-h-10 card-compact'>
      <div className='w-full min-h-40 h-80 block overflow-hidden relative'>
        <Media meme={meme} />
      </div>
      <div className='card-body'>
        <div className='tooltip' data-tip={meme?.name}>
          <h2 className='card-title line-clamp-1 text-left'>{meme?.name}</h2>
        </div>

        <p className='line-clamp-3 h-16'>{meme?.description}</p>
        <div className='flex content-start flex-wrap gap-1 overflow-y-auto h-16'>
          {meme?.tags.map((tag, i) => (
            <span
              key={i}
              className='badge hover:badge-outline [&:not(:hover)]:badge-accent cursor-pointer'
              onClick={() => {
                setQuery(tag);
                searchMemes(tag);
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <CardActions meme={meme} />
      </div>
    </div>
  );
}

export default function MemeCard({ meme, list = false }) {
  return list ? <MemeCardList meme={meme} /> : <MemeCardGrid meme={meme} />;
}
