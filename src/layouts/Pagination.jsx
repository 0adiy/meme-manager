import { useState } from "react";
import { useMemesStore } from "../store/useMemesStore";

export function Pagination() {
  const { limit, offset, getMemes, setOffset, getcount } = useMemesStore();
  const [jump, setJump] = useState(0);
  const handelNextPage = async () => {
    console.log(await getcount());
    if (offset + limit > (await getcount())) return;
    setOffset(offset + limit);
    getMemes(limit, offset);
  };
  const handelPrevPage = () => {
    if (offset - limit < 0) return;
    setOffset(offset - limit);
    getMemes(limit, offset);
  };

  const handelJump = async () => {
    if (offset < 0) return;
    if (jump < 1) return;
    if (jump * limit > (await getcount())) return;
    setOffset(jump * limit);
    getMemes(limit, 0);
  };

  return (
    <>
      <div className='join'>
        <button className='join-item btn' onClick={handelPrevPage}>
          «
        </button>
        <div className='dropdown dropdown-top join-item dropdown-open'>
          <button className='join-item btn'>Page {offset / limit + 1}</button>
        </div>
        <button className='join-item btn' onClick={handelNextPage}>
          »
        </button>
      </div>
      <div className='join w-40'>
        {/* REVIEW - check when db is large */}
        <input
          type='number'
          className='input input-bordered w-full'
          min={1}
          onChange={e => setJump(e.target.value)}
          value={jump}
        />
        <button className='btn join-item' onClick={handelJump}>
          Jump
        </button>
      </div>
    </>
  );
}
