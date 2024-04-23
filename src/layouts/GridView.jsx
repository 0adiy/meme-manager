import Card from "../components/Card.jsx";

const GridView = ({ items }) => {
  return (
    <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-4'>
      {items?.map((movie, index) => (
        <div key={index}>
          <Card movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default GridView;
