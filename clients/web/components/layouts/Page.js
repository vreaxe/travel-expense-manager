import React from "react";
import Meta from "./Meta";
import "../../styles/styles.scss";

const Page = props => {
  return (
    <div>
      <Meta />
      <div>{props.children}</div>
    </div>
  );
};

export default Page;
