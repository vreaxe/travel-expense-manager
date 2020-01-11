import ActiveLink from "./ActiveLink";
import React from "react";

const Menu = props => {
  return (
    <div>
      <ul>
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
