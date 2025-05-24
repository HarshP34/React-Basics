import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RestaurantMenu from "../RestaurantMenu";
import data from "./mocks/RestaurantMenu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import Cart from "../Cart";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(data),
    })
);

it("should load Cart component", async () => {
    await act(async () => {
        render(
            <Provider store={appStore}>
                <BrowserRouter>
                    <Header />
                    <RestaurantMenu />
                    <Cart />
                </BrowserRouter>
            </Provider>
        );
    });

    const accrodian = screen.getByText("Recommended(11)");
    fireEvent.click(accrodian);
    const itemList = screen.findAllByTestId("item-card");
    console.log(itemList.length);

    // expect(itemList.length).toBe(11);

    const addBtns = screen.getAllByRole("button", { name: "Add+" });

    fireEvent.click(addBtns[0]);
    fireEvent.click(addBtns[1]);

    const cartItem = screen.getByText("Cart (2 Items)");
    expect(cartItem).toBeInTheDocument();
    const cartItemList = screen.getAllByTestId("item-card");
    // console.log(cartItemList.length);
    expect(cartItemList.length).toBe(13);

    const removeBtn = screen.getByRole("button", { name: "Clear Cart" });

    fireEvent.click(removeBtn);
    const cartItemListAfterRemove = screen.getAllByTestId("item-card");
    expect(cartItemListAfterRemove.length).toBe(11);

})
