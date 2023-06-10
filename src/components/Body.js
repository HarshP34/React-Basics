import RestaurantCard from "./RestaurantCard";
import cards from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
// cards.sort((a, b) => {
//   const aData = { ...a.data };
//   const bData = { ...b.data };
//   return aData.deliveryTime - bData.deliveryTime;
// });
// console.log(cards);
//Local state variable
//Whenever the state variable update ,react triggers reconciliation cycle(rerender the component)

const Body = () => {
  // let listOfRestaurants = cards;
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState(" ");
  console.log("body render");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.022505&lng=72.5713621&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json?.data?.cards[2]?.data?.data?.cards.length);
    setListOfRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  };
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="seach-btn"
            onClick={() => {
              const filteredList = listOfRestaurants.filter((res) => {
                return res.data.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              });
              setFilteredRestaurants(filteredList);
              setSearchText("");
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter((res) => {
              return res.data.avgRating > 4;
            });
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.data.id} resData={restaurant} />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
