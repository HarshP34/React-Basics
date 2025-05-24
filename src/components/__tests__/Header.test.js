import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Header from "../Header"
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";

describe('Header Component', () => {
    it('should render Header Component with Login button', () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );

        const LoginButton = screen.getByRole("button", { name: "Login" });
        expect(LoginButton).toBeInTheDocument();
    });

    it('should render Header Component with Cart (0 Items)', () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );

        const cartItem = screen.getByText("Cart (0 Items)");
        expect(cartItem).toBeInTheDocument();
    });

    it('should render Header Component with Cart', () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );
        const cartItem = screen.getByText(/Cart/);
        expect(cartItem).toBeInTheDocument();
    });


    it('should change the login button to logout onClick', () => {
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>
        );
        const LoginButton = screen.getByRole("button", { name: "Login" });
        fireEvent.click(LoginButton);
        const LogoutButton = screen.getByRole("button", { name: "Logout" });
        expect(LogoutButton).toBeInTheDocument();
    });
})

