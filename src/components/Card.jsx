// rfc
import { useState } from "react";

export default function Card({ movie }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='card card-compact w-full bg-base-100 shadow-xl'>
      <figure>
        {/* suggest classes for img */}
        <img className='w-full' src={movie?.poster} alt={movie?.title} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{movie?.title}</h2>
        <p>(Description)If a dog chews shoes whose shoes does he choose?</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-secondary'>Visit</button>
        </div>
      </div>
    </div>
  );
}
