import { useState } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

import { navbarData } from "../../constants";
import { openDialog } from "../../redux/slices/signupDialog";

export default function Navbar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="px-4 lg:px-20 py-5 bg-[#A080E1] flex flex-wrap justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-2xl lg:text-4xl font-black text-gray-800">
          <span className="text-[#B7C2C6]">Dating</span>
          <span className="text-gray-800"> App</span>
        </h1>
      </Link>
      {/* Mobile Menu Icon */}
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-800 text-2xl hover:text-gray-900 focus:outline-none"
        >
          {isOpen ? <IoCloseSharp /> : <RxHamburgerMenu />}
        </button>
      </div>
      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex lg:flex-wrap gap-4 lg:gap-8 font-semibold`}
      >
        {navbarData.map((elm) => (
          <NavLink
            key={nanoid()}
            to={elm.link}
            className={({ isActive }) =>
              isActive
                ? "text-white"
                : "text-gray-900 hover:text-black hover:scale-105 duration-300"
            }
            onClick={()=>{
              if(elm.name === "Signup"){
                dispatch(openDialog())
              }
            }}
          >
            {elm.name}
          </NavLink>
        ))}
      </div>
    </section>
  );
}
