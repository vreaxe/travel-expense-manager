import React from "react";
import ActiveLink from "./ActiveLink";

const Menu = props => {
  return (
    <div>
      <ul>
        <li>
          <ActiveLink href="/dashboard">
            <a className="">
              <span className="emoji">📊</span> Dashboard
            </a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink href="/trips">
            <a className="">
              <span className="emoji">🌍</span> Trips
            </a>
          </ActiveLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
