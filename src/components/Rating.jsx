export default function Rating({ rating }) {
  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map(num => (
        <input
          type='radio'
          disabled
          className='mask mask-star bg-yellow-500'
          key={num}
          checked={num == parseInt(rating)}
        />
      ))}
    </div>
  );
}
