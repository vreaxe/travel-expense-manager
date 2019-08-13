import Cross from "../elements/Cross";
import Menu from "../Menu";
import React from "react";
import UserInfo from "../UserInfo";

const Sidebar = props => {
  return (
    <div className="sidebar relative">
      <Cross
        className="lg:hidden absolute mb-2 text-xl"
        onClick={props.toggleSidebar}
      />
      <UserInfo {...props} />
      <Menu />
    </div>
  );
};

export default Sidebar;
