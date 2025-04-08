import React, { useState } from "react";
import { navItems } from "../utils/data";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [ isMenuOpen, setIsMenuOpen ] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="top-0 z-50 py-3 w-full bg-black text-gray-400">
      <div className="flex container items-center md:justify-center justify-between">
        <div>
          <h5 className="ml-5 text-3xl font-medium">Bruce</h5>
        </div>
        <ul className="hidden md:flex md:flex-row ml-60 space-x-4 leading-[40px]">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <CiMenuBurger 
        className="block md:hidden mr-5 leading-[40px]"
        onClick={toggleMenu}
        />
        {isMenuOpen && (
        <ul className="md:hidden bg-black text-white flex flex-col space-y-4 p-4 absolute top-16 left-0 right-0 shadow-md">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.href} 
                className="text-lg hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}  // Close the menu when a link is clicked
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
