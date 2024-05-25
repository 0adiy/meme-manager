import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddMemeButton() {
  const handelClick = () => {
    document.getElementById("add_or_update_meme_modal").showModal();
  };
  return (
    <>
      <div className='tooltip-bottom tooltip' data-tip='Add Meme'>
        <button className='btn btn-primary mx-4' onClick={handelClick}>
          <PlusIcon className='size-5' />
        </button>
      </div>
    </>
  );
}
