import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { CDN_LINK, MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";
import ItemList from "./ItemList";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(-1);
  const resInfo = useRestaurantMenu(resId);
  const onlineStatus = useOnlineStatus();
  if (resInfo == null) return <Shimmer />;

  const { name, cuisines, avgRating, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;
  const catgories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((card) => {
      return card?.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
    }
    );

  if (!onlineStatus) return <h1>Opps!!! Looks like you are offline 🛜. Please check your Internet Connection. </h1>
  return (
    <div className="menu">
      <h1 className="font-bold ml-[40rem] text-lg">{name}</h1>
      <h3 className="ml-[40rem]">🍴 {cuisines.join(", ")}</h3>
      <h3 className="ml-[40rem]">💵 {costForTwoMessage}</h3>
      <h3 className="ml-[40rem]">⭐ {avgRating}</h3>
      <div className="menu-category">
        {catgories
          ? catgories.map((category, index) => (
            <RestaurantCategory key={category?.card?.card?.title}
              data={category?.card?.card}
              showItems={showIndex === index ? true : false}
              setShowIndex={() => showIndex === index ? setShowIndex(-1) : setShowIndex(index)}
            />
          ))
          : {}}
      </div>
    </div>
  );
};

export default RestaurantMenu;
