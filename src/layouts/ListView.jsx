//react funcitonal component

import Rating from "../components/Rating";

import Card from "../components/Card";

const ListView = ({ items }) => {
  return (
    <div className='flex flex-col gap-4 m-4'>
      {items?.map((movie, index) => (
        <div key={index}>
          <Card movie={movie} list={true} />
        </div>
      ))}
    </div>
  );
};

export default ListView;
