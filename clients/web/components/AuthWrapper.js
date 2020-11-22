import Content from "./layouts/Content";
import React from "react";
import Sidebar from "./layouts/Sidebar";
import ThreeLines from "../components/elements/ThreeLines";
import classNames from "classnames";
import useSidebar from "../hooks/useSidebar";

const AuthWrapper = props => {
  const { sidebarRef, isShowingSidebar, toggleSidebar } = useSidebar();

  return (
    <div className="container w-full flex flex-wrap mx-auto">
      <ThreeLines onClick={toggleSidebar} />
      <div
        className={classNames(
          "sidebar-container px-6 fixed overflow-y-scroll z-50 h-screen bg-gray-200 lg:w-1/5 lg:px-6 lg:static lg:overflow-auto lg:z-auto lg:h-auto lg:bg-transparent lg:shadow-none",
          { active: isShowingSidebar }
        )}
        ref={sidebarRef}
      >
        <Sidebar toggleSidebar={toggleSidebar} {...props} />
      </div>
      <div className="w-full lg:w-4/5 p-6 pt-0">
        <Content {...props}>{props.children}</Content>
      </div>
    </div>
  );
};

export default AuthWrapper;
