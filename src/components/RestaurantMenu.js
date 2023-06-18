import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  useEffect(() => {
    fechMenu();
  }, []);

  const fechMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResInfo(json?.data);
  };

  if (resInfo == null) return <Shimmer />;

  const { name, cuisines, avgRating, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;
  const recommendedCard =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (card) => {
        return card?.card?.card?.title !== undefined;
      }
    );
  console.log(recommendedCard, 30);
  return (
    <div className="menu">
      <h1>{name}</h1>
      <h3>{cuisines.join(", ")}</h3>
      <h3>{costForTwoMessage}</h3>
      <h3>{avgRating}</h3>
      <h2>Menu</h2>
      <div className="menu-category">
        {recommendedCard
          ? recommendedCard.map((element) => (
              <div className="category" key={element.card.card.id}>
                <h2 className="category-name">{element.card.card.title}</h2>
                <ul key={element.card.card.id}>
                  {element?.card?.card?.itemCards?.map((item) => (
                    <li className="item" key={item.card.info.id}>
                      {item.card.info.name} - Rs.
                      {item.card.info.price / 100}
                      {console.log(item.card.info.name)}
                    </li>
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
