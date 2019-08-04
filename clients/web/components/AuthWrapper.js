import Content from "./layouts/Content";
import PropTypes from "prop-types";
import React from "react";
import Sidebar from "./layouts/Sidebar";

const AuthWrapper = props => {
  return (
    <div className="container w-full flex flex-wrap mx-auto p-6 xl:p-0">
      <div className="w-full lg:w-1/5 lg:px-6">
        <Sidebar {...props} />
      </div>
      <div className="w-full lg:w-4/5 lg:px-6">
        <Content {...props}>{props.children}</Content>
      </div>
    </div>
  );
};

export default AuthWrapper;
