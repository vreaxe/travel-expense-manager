import React from "react";
import UserInfo from "../UserInfo";
import Menu from "../Menu";

const Sidebar = props => {
  return (
    <div className="sidebar">
      <UserInfo {...props} />
      <Menu />
    </div>
  );
};

export default Sidebar;
