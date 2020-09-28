import React from "react";

const Header = ({ children }) => {
  return (
    <h1
      className="flex items-center font-bold text-2xl mb-4 border-b-2 pb-2 border-green-500 uppercase"
      data-cy="header-h1"
    >
      {children}
    </h1>
  );
};

export default Header;
