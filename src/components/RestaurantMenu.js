import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { CDN_LINK, MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const onlineStatus = useOnlineStatus();
  if (resInfo == null) return <Shimmer />;

  const { name, cuisines, avgRating, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;
  const recommendedCard =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (card) => {
        return card?.card?.card?.title !== undefined;
      }
    );
    // changes in the swiggy api
    // data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards[1].card.info
    // data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.title
  console.log(recommendedCard, 30);

  if(!onlineStatus) return <h1>Opps!!! Looks like you are offline 🛜. Please check your Internet Connection. </h1>
  return (
    <div className="menu">
      <h1 className="font-bold ml-[40rem] text-lg">{name}</h1>
      <h3 className="ml-[40rem]">🍴 {cuisines.join(", ")}</h3>
      <h3 className="ml-[40rem]">💵 {costForTwoMessage}</h3>
      <h3 className="ml-[40rem]">⭐ {avgRating}</h3>
      <h2 className="font-bold ml-[40rem] text-lg">Menu</h2>
      <div className="menu-category">
        {recommendedCard
          ? recommendedCard.map((element) => (
              <div className="category" key={element.card.card.id}>
                <h2 className="category-name font-bold ml-[40rem]">{element.card.card.title}</h2>
                <ul className="items-container flex flex-wrap justify-start" key={element.card.card.id}>
                  {element?.card?.card?.itemCards?.map((item) => (
                    <><div className="m-6 p-4 w-[200px] h-[300px] bg-gray-200 rounded-md hover:bg-gray-300">
                    <img
                      className="item-image rounded-md"
                      key= {item.card.info.imageId}
                      src={CDN_LINK + item.card.info.imageId}
                    ></img>
                    <li className="item font-bold py-4" key={item.card.info.id}>
                      {item.card.info.name}
                      {/* {console.log(item.card.info.name)} */}
                    </li>
                    <li className="item font-bold" key={item.card.info.id}>
                      Rs.{(item.card.info.price / 100) || (item.card.info.defaultPrice / 100)}
                      {/* {console.log(item.card.info.name)} */}
                    </li>
                      </div>
                    </>
                  ))}
                </ul>
              </div>
            ))
          : {}}
      </div>
    </div>
  );
};

export default RestaurantMenu;
