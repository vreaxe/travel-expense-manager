import "../../styles/styles.scss";

import Meta from "./Meta";
import React from "react";

const Page = props => {
  return (
    <div>
      <Meta />
      <div>{props.children}</div>
    </div>
  );
};

export default Page;
