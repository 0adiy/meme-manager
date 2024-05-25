import { useDeleteStore } from "../store/useDeleteStore";
import { useMemesStore } from "../store/useMemesStore";

export default function DeleteDialog() {
  const { memeToDelete, resetMemeToDelete } = useDeleteStore();
  const { removeMeme } = useMemesStore();
  return (
    <>
      {memeToDelete && (
        <dialog className='modal modal-open'>
          <div className='modal-box text-left'>
            <h3 className='font-bold text-lg'>Remove</h3>
            <p className='py-4'>
              Are you sure you want to remove{" "}
              <strong>{memeToDelete.name}</strong>?
            </p>
            <div className='modal-action'>
              <button
                className='btn btn-error'
                onClick={() => memeToDelete.id && removeMeme(memeToDelete.id)}
              >
                Confirm
              </button>
              <form method='dialog'>
                <button className='btn' onClick={() => resetMemeToDelete()}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
