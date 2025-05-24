import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);
    const dispatch = useDispatch();
    handleClearCart = () => {
        dispatch(clearCart());
    };
    return (
        <div className="text-center m-4 w-6/12 mx-auto my-4">
            <div className="flex justify-between items-center">
                <span className="text-lg">Cart Items({cartItems.length})</span>
                <button className="m-1 p-2 bg-yellow-100 text-gray-900 rounded-md hover:bg-yellow-200"
                    onClick={handleClearCart}>
                    Clear Cart
                </button>
            </div>

            <div className="cart  bg-gray-50 p-4 shadow-lg  rounded-lg">
                {!cartItems.length && <h1 className="text-lg">Your Cart is Empty</h1>}
                <ItemList data={cartItems} />
            </div>
        </div>

    );
};

export default Cart;