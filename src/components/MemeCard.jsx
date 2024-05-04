/* 
    pub id: Option<i64>,
    pub name: String,
    pub url: String,
    pub description: String,
    pub tags: Vec<String>,
*/

function Media({ meme }) {
  const furl = meme?.url?.replace(/\?.*$/, "");
  console.log(furl);
  const condition =
    furl.endsWith(".gif") ||
    furl.endsWith(".jpg") ||
    furl.endsWith(".jpeg") ||
    furl.endsWith(".png");
  return (
    <>
      {condition ? (
        <img
          className='absolute inset-0 w-full h-full object-contain'
          src={meme?.url}
          alt={meme?.name}
        />
      ) : (
        <video
          loop
          controls
          className='absolute inset-0 w-full h-full object-contain'
          src={meme?.url}
        />
      )}
    </>
  );
}

export default function MemeCard({ meme, list = false }) {
  return (
    <div
      className={`card bg-base-200 shadow-xl min-h-10 ${
        list ? "card-side" : "card-compact"
      }`}
    >
      <div
        className={
          list
            ? "w-40 m-2 block overflow-hidden relative rounded-box shrink-0"
            : "w-full min-h-40 h-80 block overflow-hidden relative"
        }
      >
        <Media meme={meme} />
      </div>
      <div className='card-body'>
        <h2 className='card-title line-clamp-1'>{meme?.name}</h2>
        <p className='line-clamp-3'>{meme?.description}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-secondary'>Copy</button>
        </div>
      </div>
    </div>
  );
}
