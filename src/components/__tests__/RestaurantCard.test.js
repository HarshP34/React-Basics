import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockRestaurantCard from "./mocks/RestaurantCard.json";
import RestaurantCard from "../RestaurantCard";



describe("RestaurantCard Component", () => {
    it("should load ResataurantCard with prop data", () => {
        render(
            <RestaurantCard resData={MockRestaurantCard} />
        )
        const resName = screen.getByText("Wow! Momo");
        expect(resName).toBeInTheDocument();
    })
})