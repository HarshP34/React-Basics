import { useEffect, useState } from "react";

const useRestaurantList = (setListOfRestaurants, setFilteredRestaurants) => {
    const [resList, setResList] = useState(null);
    // const fetchResturantAPI = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.02760&lng=72.58710&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
    useEffect(() => {
        fetchData();
        // console.log('resList useEffect called!!');
    }, []);

    const fetchData = async() => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.02760&lng=72.58710&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        setResList(json.data);
        const [fetchListOfRestaurants] = json?.data?.cards?.filter(
            (list) => list?.card?.card?.id === "restaurant_grid_listing_v2"
            );
        setListOfRestaurants(
          fetchListOfRestaurants.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        );
        setFilteredRestaurants(
          fetchListOfRestaurants.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        );
    }
    return resList;
}

export default useRestaurantList;