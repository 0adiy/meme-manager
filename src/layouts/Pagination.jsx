import { useState } from "react";
import { useMemesStore } from "../store/useMemesStore";

export function Pagination() {
  const { limit, offset, getMemes, setOffset, getcount } = useMemesStore();
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

  return (
    <div className='join'>
      <button className='join-item btn' onClick={handelPrevPage}>
        «
      </button>
      <div className='dropdown dropdown-top join-item dropdown-open'>
        <button className='join-item btn'>Page {offset / limit + 1}</button>
        <div
          tabIndex={0}
          className='dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-100 rounded-box'
        >
          <div className='card-body'>
            <h3 className='card-title'>Enter page No.</h3>
            {/* REVIEW - check when db is large */}
            <input
              type='number'
              className='input input-bordered w-full'
              min={1}
              max={getcount()
                .then(count => Math.ceil(count / limit))
                .then(maxCount => maxCount)}
              onChange={async e => {
                const maxCount = await getcount().then(count =>
                  Math.ceil(count / limit)
                );
                const value = Math.min(parseInt(e.target.value), maxCount);
                setOffset((value - 1) * limit);
                getMemes(limit, (value - 1) * limit);
              }}
              value={offset / limit + 1}
            />
          </div>
        </div>
      </div>
      <button className='join-item btn' onClick={handelNextPage}>
        »
      </button>
    </div>
  );
}
