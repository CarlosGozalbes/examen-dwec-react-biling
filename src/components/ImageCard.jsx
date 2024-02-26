import { BsStar, BsStarFill } from "react-icons/bs";
// eslint-disable-next-line react/prop-types
function ImageCard({
  index,
  element,
  favorita,
  removeFromFavourite,
  addToFavourite,
}) {
  return (
    <div className="mb-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={element} alt="" />

      <div className="p-5">
        {favorita ? (
          <BsStarFill
            size={24}
            color="white"
            onClick={() => removeFromFavourite(index)}
          />
        ) : (
          <BsStar
            size={24}
            color="white"
            onClick={() => addToFavourite(index)}
          />
        )}
      </div>
    </div>
  );
}

export default ImageCard;
