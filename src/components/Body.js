import RestaurantCard from "./RestaurantCard";
import cards from "../utils/mockData";
import { useState } from "react";

// cards.sort((a, b) => {
//   const aData = { ...a.data };
//   const bData = { ...b.data };
//   return aData.deliveryTime - bData.deliveryTime;
// });
// console.log(cards);
const Body = () => {
  //Local state variable
  //Whenever the state variable update react rerender the components
  const arr = useState(cards);
  // let listOfRestaurants = cards;
  const listOfRestaurants = arr[0];
  const setListOfRestaurants = arr[1];
  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter((res) => {
              return res.data.avgRating > 4;
            });
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.data.id} resData={restaurant} />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
