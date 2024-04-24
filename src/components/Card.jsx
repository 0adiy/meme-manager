import Rating from "./Rating";

export default function Card({ movie, list = false }) {
  return list ? (
    <div className='card card-side bg-base-100 shadow-xl min-h-60'>
      <div className='w-40 m-2 block overflow-hidden relative rounded-box shrink-0'>
        <img
          className='absolute inset-0 w-full h-full object-contain'
          src={movie?.poster}
          alt={movie?.title}
        />
      </div>
      <div className='card-body'>
        <h2 className='card-title line-clamp-1'>{movie?.title}</h2>
        <p className='line-clamp-3'>{movie?.description}</p>
        <Rating rating={movie?.rating} />
        {/* <div className='card-actions justify-end'>
            <button className='btn btn-primary'>Watch</button>
          </div> */}
      </div>
    </div>
  ) : (
    <div className='card card-compact w-full bg-base-100 shadow-xl'>
      <div className='w-full min-h-40 h-80 block overflow-hidden relative'>
        <img
          className='absolute inset-0 w-full h-full object-cover'
          src={movie?.poster}
          alt={movie?.title}
        />
      </div>
      <div className='card-body'>
        <h2 className='card-title line-clamp-1'>{movie?.title}</h2>
        <p className='line-clamp-3'>{movie?.description}</p>
        <Rating rating={movie?.rating} />
        {/* <div className='card-actions justify-end'>
          <button className='btn btn-secondary'>Visit</button>
        </div> */}
      </div>
    </div>
  );
}
