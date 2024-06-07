import MemeCard from "../components/MemeCard";

const ListView = ({ items }) => {
  return (
    <div className='flex flex-col gap-4 m-4 w-full flex-grow px-2 items-center'>
      {items?.map(meme => (
        <MemeCard meme={meme} key={meme?.id} list={true} />
      ))}
    </div>
  );
};

export default ListView;
