import React from "react";
import PropTypes from "prop-types";
import { Router } from "../../routes";

const BackButton = props => {
  return (
    <span
      className="text-gray-600 hover:text-gray-700 text-sm mr-2 pr-2 border-r border-gray-600 cursor-pointer"
      onClick={() => Router.pushRoute(props.routeName, props.routeParams)}
    >
      ← Back
    </span>
  );
};

BackButton.propTypes = {
  routeName: PropTypes.string.isRequired,
  routeParams: PropTypes.object
};

BackButton.defaultProps = {
  routeName: null,
  routeParams: {}
};

export default BackButton;
