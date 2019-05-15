import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

// https://gist.github.com/remy/0dde38897d6d660f0b63867c2344fb59
const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children);
  const activeClassName = props.activeClassName || "active";

  let className = child.props.className || "";
  if (router.pathname === props.href) {
    className = `${className} ${activeClassName}`.trim();
  }

  delete props.activeClassName;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(ActiveLink);
