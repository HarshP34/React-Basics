import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Body from "../Body";
import data from "./mocks/RestaurantList.json";

import { BrowserRouter } from "react-router-dom";


global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(data),
    })
);

describe("Restaurant Search Component", () => {
    it("should filter restaurant list with search input", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <Body />
                </BrowserRouter>
            )
        });

        const searchBtn = screen.getByRole("button", { name: "Search" });

        const searchInput = screen.getByTestId("search-input");
        fireEvent.change(searchInput, { target: { value: "Pizza" } });
        fireEvent.click(searchBtn);

        const resList = await screen.findAllByTestId("res-card");

        expect(resList.length).toBe(1);
    });


    it("should filter restaurant list with top rated restaurant", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <Body />
                </BrowserRouter>
            )
        });

        const topRatedBtn = screen.getByRole("button", { name: "Top Rated Restaurant" });

        fireEvent.click(topRatedBtn);

        const resList = await screen.findAllByTestId("res-card");
        expect(resList.length).toBe(7);
    });
})

