import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { navbarData } from "../../constants";
import { toggleSignupDialog } from "../../redux/slices/signupDialog";

import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import { ChevronDownIcon, Bars2Icon } from "@heroicons/react/24/solid";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="user-profile-pic"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {navbarData?.profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === navbarData?.profileMenuItems?.length - 1;
          return (
            <MenuItem
              key={nanoid()}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Link
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

function NavList({ isUser }) {
  console.log(isUser,"----------------")
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navbarData?.navListItems.map(({ label, icon, link, color }) => {
        if (label === "Matches" && !isUser) {
          return null;
        }

        return (
          <NavLink
            key={nanoid()}
            to={link}
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, {
                className: `h-[18px] w-[18px] text-${color}-300`,
              })}
              <span className="text-gray-900 font-semibold"> {label}</span>
            </MenuItem>
          </NavLink>
        );
      })}
    </ul>
  );
}

export default function ComplexNavbar() {
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const { isUserLoggedIn } = useSelector((state) => state.userLogStatus);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex justify-between items-center w-full">
          <Typography
            className="mr-4 ml-2 py-1.5 text-2xl font-black select-none"
            style={{ textShadow: "2px 2px 4px rgba(0, 128, 0, 0.50)" }}
          >
            DATING APP
          </Typography>
          <div className="hidden lg:block">
            <NavList isUser={isUserLoggedIn} />
          </div>
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <NavLink
          className="ml-2 mr-2 hover:bg-gray-200 duration-300 rounded-full px-3 py-1.5"
          to={"/signup"}
          onClick={() => dispatch(toggleSignupDialog())}
        >
          <span className="text-green-400 font-semibold hover:text-green-600 duration-300">
            Signup
          </span>
        </NavLink>
        {isUserLoggedIn && <ProfileMenu />}
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}

NavList.propTypes = {
  isUser: PropTypes.bool.isRequired,
};
