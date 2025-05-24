import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "../Contact";


describe('contact component', () => {
    test("Contact component renders correctly", () => {
        render(<Contact />);
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    });

    test("Contact component has correct heading text", () => {
        render(<Contact />);
        const placeHolder = screen.getByPlaceholderText("Name");
        expect(placeHolder).toBeInTheDocument();
    });

    test("load input boxes", () => {
        render(<Contact />);
        const inputBoxes = screen.getAllByRole("textbox");
        expect(inputBoxes.length).toBe(2);
    })
})

