import Menu from "../Menu";
import React from "react";
import UserInfo from "../UserInfo";

const Sidebar = props => {
  return (
    <div className="sidebar">
      <UserInfo {...props} />
      <Menu />
    </div>
  );
};

export default Sidebar;
