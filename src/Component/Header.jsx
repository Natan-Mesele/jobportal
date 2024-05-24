import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

function Header() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  return (
    <div className="p-2 bg-white lg:px-20 shadow-md">
      <div className="flex justify-between items-center">
        <div className="">
        <Link to="/hero">
            <img
              src="https://order.qranbessa.net/uploads/a3fb7c7b6c408451a0a8bf4716711929.png"
              className="rounded-lg object-cover h-16 w-18"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="hidden sm:block">
          <div className="flex gap-4 item-center uppercase text-sm">
            <Link to="/" className="border-b-2 border-white">
              Find Jobs
            </Link>
            <Link to="/reservation">Find Companies</Link>
            <Link to="/cart">Blog</Link>
            <Link to="/login">Contact Us</Link>
            <Link to="/login">Log in</Link>
            <div>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-8 py-2 rounded-full"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="sm:hidden cursor-pointer">
          {/* Assuming MenuIcon component is defined */}
          <MenuIcon onClick={() => setBurgerMenuOpen(true)} />
        </div>
      </div>

      {/* Burger Nav */}
      <div
        className={`${
          burgerMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 bg-gray-200 w-1/2 h-full flex flex-col text-left p-4 transition-transform duration-500 lg:w-1/3 sm:hidden`}
      >
        <div className="flex justify-start m-2">
          {/* Assuming CloseIcon component is defined */}
          <CloseIcon
            className="cursor-pointer"
            onClick={() => setBurgerMenuOpen(false)}
          />
        </div>
        <div className="flex flex-col gap-4 uppercase text-sm mt-4">
          <Link to="/" className="border-b-2 border-black w-20">
            Find Jobs
          </Link>
          <Link to="/reservation">Find Companies</Link>
          <Link to="/cart">Blog</Link>
          <Link to="/login">Contact Us</Link>
          <Link to="/login">Log in</Link>
          <Link to="/login">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
