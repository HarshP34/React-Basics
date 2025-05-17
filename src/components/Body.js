import RestaurantCard from "./RestaurantCard";
import cards from "../utils/mockData";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link, json } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import useRestaurantList from "../utils/useRestaurantList";
import UserContext from "../utils/UserContext";
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
  // const resData = useRestaurantList();
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();
  // useEffect(() => {
  //   fetchData();
  // }, []);
  const resData = useRestaurantList(setListOfRestaurants, setFilteredRestaurants);
  // console.log("body render");
  // const fetchData = async () => {
  //   const data = await fetch(
  //     // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.0521705&lng=72.54970689999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.02760&lng=72.58710&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const json = await data.json();


  //   const [fetchListOfRestaurants] = json?.data?.cards?.filter(
  //   (list) => list?.card?.card?.id === "restaurant_grid_listing"
  //   );
  //   setListOfRestaurants(
  //     fetchListOfRestaurants.card?.card?.gridElements?.infoWithStyle
  //       ?.restaurants
  //   );
  //   setFilteredRestaurants(
  //     fetchListOfRestaurants.card?.card?.gridElements?.infoWithStyle
  //       ?.restaurants
  //   );
  // }

  const { setUserName, loggedInUser } = useContext(UserContext);
  if(resData == null) return <Shimmer />;

  if(!onlineStatus) return <h1>Opps!!! Looks like you are offline 🛜. Please check your Internet Connection. </h1>
  return(
    <div className="body">
      <div className="filter flex justify-start">
        <div className="search p-4 m-2">
          <input
            type="text"
            className=" border border-solid border-black rounded-md"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="px-4 py-1 bg-green-300 m-2 rounded-lg hover:bg-green-400"
            onClick={() => {
                const filteredList = listOfRestaurants.filter((res) => {
                  return res.info.name
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
        <div className="search p-4 m-2 flex items-center">
        <button
          className="px-4 py-1 bg-blue-300 rounded-lg m-2 hover:bg-blue-400"
          onClick={() => {
            const filteredList = listOfRestaurants.filter((res) => {
              return res.info.avgRating > 4.2;
            });
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
        </div>
        <div className="search p-4 m-2 flex items-center">
          <label className="">UserName :</label>
          <input className="border border-black p-2" 
          value={loggedInUser}
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setUserName(e.target.value)}/>
      </div>
      </div>

      <div className="flex flex-wrap justify-start">
        {filteredRestaurants.map((restaurant) => {
          return (
            <Link
              className="link"
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
