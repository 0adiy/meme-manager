// rfc
import { useState } from "react";

export default function Card({ movie }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='card card-compact w-full bg-base-100 shadow-xl'>
      <div className='w-full min-h-40 h-80 block overflow-hidden relative'>
        {/* suggest classes for img */}
        <img
          className=' absolute inset-0 w-full h-full object-cover'
          src={movie?.poster}
          alt={movie?.title}
        />
      </div>
      <div className='card-body'>
        <h2 className='card-title'>{movie?.title}</h2>
        <p>(Description)If a dog chews shoes whose shoes does he choose?</p>
        <div className='rating'>
          {[1, 2, 3, 4, 5].map(num => (
            <input
              type='radio'
              disabled
              className='mask mask-star bg-yellow-500'
              key={num}
              checked={num == parseInt(movie?.rating)}
            />
          ))}
        </div>
        {/* <div className='card-actions justify-end'>
          <button className='btn btn-secondary'>Visit</button>
        </div> */}
      </div>
    </div>
  );
}
