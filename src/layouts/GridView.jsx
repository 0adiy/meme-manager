import MemeCard from "../components/MemeCard.jsx";

const GridView = ({ items }) => {
  return (
    <div
      className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 
			           gap-4 m-4 w-full flex-grow'
    >
      {items?.map(meme => (
        <div key={meme?.id}>
          <MemeCard meme={meme} />
        </div>
      ))}
    </div>
  );
};

export default GridView;
