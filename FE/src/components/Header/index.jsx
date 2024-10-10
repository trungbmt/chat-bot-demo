/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="">
      <nav class="bg-white border-gray-200 lg:px-6 py-2.5 dark:bg-gray-800">
        <div class="flex flex-wrap justify-between items-center">
          <Link to={"/"} class="flex items-center">
          </Link>

          <div class="flex items-center lg:order-2 cursor-pointer"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
