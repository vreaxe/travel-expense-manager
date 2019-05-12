import React from "react";
import Meta from "./Meta";

class Page extends React.Component {
  render() {
    return (
      <div>
        <Meta />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Page;
