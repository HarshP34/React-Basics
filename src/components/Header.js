import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  console.log("header rerender");

  // Use Effect
  // If there is no dependency array in useEffect => it is called on every render.
  // If there is empty dependency array [] => it is called only on initial render.
  // If there is dependency array [btnNameReact] => it is called when btnNameReact is updated.
  useEffect(() => {
    console.log("use Effect called");
  }, []);


  const onlineStatus = useOnlineStatus();

  return (
    <div className="flex justify-between bg-gray-100 mb-1 shadow-lg" >
      <div className="logo-container">
        <img className="w-[100px]" src={LOGO_URL}></img>
      </div>
      <div className="flex items-center">
        <ul className="flex items-center">
          <li className="px-4">
            Online Status: {onlineStatus ? '✅' : '🚫'}
          </li>
          <li className="px-4">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="px-4">
            <Link className="link" to="/about">
              About Us
            </Link>
          </li>
          <li className="px-4">
            <Link className="link" to="/grocery">
              Grocery
            </Link>
          </li>
          <li className=" px-4 hover:text-sky-600">
            <Link className="link" to="/contact">
              Contact Us
            </Link>
          </li>
          <li className="px-4 hover:text-sky-600 ">Cart</li>
          <button
            className="px-4 py-1 m-4 bg-sky-500 hover:bg-sky-600 border border-solid border-black rounded-md"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
