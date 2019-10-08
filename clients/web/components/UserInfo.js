import React from "react";
import { destroyCookie } from "nookies";
import { redirect } from "../lib/utils";

const UserInfo = props => {
  const handleLogout = () => {
    props.apollo.cache.reset();
    destroyCookie(null, "token");
    redirect(null, "/login");
  };
  return (
    <div className="my-6">
      <img className="mx-auto my-6" src={"/default-avatar.png"} />
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
