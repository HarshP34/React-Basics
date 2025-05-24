import { CDN_LINK } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, slaString } =
    resData?.info;
  return (
    <div
      data-testid="res-card"
      className="m-6 p-4 w-[200px] h-[310px] bg-gray-200 rounded-md hover:bg-gray-300">
      <img
        className="rounded-md"
        alt="res-logo"
        src={CDN_LINK + cloudinaryImageId}
      ></img>
      <h3 className="font-bold py-4">{name}</h3>
      <h4 className="res-cuisines">{cuisines.join(", ")}</h4>
      <h4 className="res-price">{avgRating} ⭐</h4>
      <h4 className="res-rating">{slaString}</h4>
    </div>
  );
};

export default RestaurantCard;
