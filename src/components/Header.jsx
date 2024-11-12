import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          Expense Tracking App
        </div>

        {/* Links (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-end items-center">
          <ul className="lg:flex lg:space-x-6 text-white">
            <li className="hover:text-blue-300">
              <a href="/">Income</a>
            </li>
            <li className="hover:text-blue-300">
              <a href="/expenses">Expense</a>
            </li>
            <li className="hover:text-blue-300">
              <a href="/balance">Balance</a>
            </li>
            {/* <li className="hover:text-blue-300">
              <a href="/about">About Us</a>
            </li> */}
          </ul>
        </div>

        {/* Menu button for mobile view (aligned to the right) */}
        <div className="lg:hidden ml-auto">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Links (Mobile) */}
      <div
        className={`lg:hidden ${
          isOpen ? "block" : "hidden"
        } absolute bg-blue-600 w-full mt-4`}
      >
        <ul className="text-white space-y-4 text-center py-4">
          <li className="hover:text-blue-300">
            <a href="/">Incomes</a>
          </li>
          <li className="hover:text-blue-300">
            <a href="/expenses">Expenses</a>
          </li>
          <li className="hover:text-blue-300">
            <a href="/balance">Balance</a>
          </li>
          {/* <li className="hover:text-blue-300">
            <a href="#contact">Contact</a>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
