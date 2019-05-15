import React from "react";
import { destroyCookie } from "nookies";
import { redirect } from "../lib/utils";

const UserInfo = props => {
  const handleLogout = () => {
    destroyCookie(null, "token");
    redirect(null, "/login");
  };
  return (
    <div className="mb-6">
      <img
        className="rounded-full mx-auto my-6"
        src={"https://via.placeholder.com/150?text=User"}
      />
      <div className="text-center">
        {props.loggedUser.email}
        <span onClick={handleLogout} className="cursor-pointer ml-2">
          🔴
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
