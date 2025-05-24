import { useDispatch } from "react-redux";
import { CDN_LINK } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ data }) => {
    const dispatch = useDispatch();
    const handleAddItem = (item) => {
        dispatch(addItem(item))
        console.log("Item added to cart");
    };
    return (
        <div>
            <div>
                {data.map((item) => (
                    <div key={item.card.info.id}
                        data-testid="item-card"
                        className="p-2 m-2 border-b-2 border-gray-200 text-left flex justify-between">
                        <div className="w-9/12 py-2">
                            <div className="py-2">
                                <span>{item.card.info.name}</span>
                                <span className="text-red-500"> - ₹
                                    {
                                        item.card.info.price ?
                                            item.card.info.price / 100 :
                                            item.card.info.defaultPrice / 100
                                    }</span>
                            </div>
                            <p className="text-xs">{item.card.info.description}</p>
                        </div>
                        <div className="w-3/12 p-2">
                            <div className="absolute flex items-end">
                                <button className="p-1 mt-11 mx-7 bg-gray-50 m-auto shadow-lg rounded-md hover:bg-gray-200 border border-black-200 items-center"
                                    onClick={() => handleAddItem(item)}
                                >
                                    Add+
                                </button>
                            </div>
                            <img src={CDN_LINK + item.card.info.imageId} className="rounded-md"></img>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ItemList;