import Card from "../components/Card.jsx";

const GridView = ({ items }) => {
  return (
    <div className='grid grid-cols-4 gap-4 m-4'>
      {items?.map((movie, index) => (
        <div key={index}>
          <Card movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default GridView;
