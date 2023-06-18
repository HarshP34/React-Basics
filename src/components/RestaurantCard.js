import { CDN_LINK } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, slaString } =
    resData?.data;
  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt="res-logo"
        src={CDN_LINK + cloudinaryImageId}
      ></img>
      <h3 className="res-name">{name}</h3>
      <h4 className="res-cuisines">{cuisines.join(", ")}</h4>
      <h4 className="res-price">{avgRating} ⭐</h4>
      <h4 className="res-rating">{slaString}</h4>
    </div>
  );
};

export default RestaurantCard;
