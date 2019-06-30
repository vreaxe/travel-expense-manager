import React from "react";
import PropTypes from "prop-types";

const NoItems = props => {
  if (!props.items || !props.items.length) {
    return <div className="text-center">No {props.itemName}</div>;
  } else {
    return null;
  }
};

NoItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  itemName: PropTypes.string.isRequired
};

export default NoItems;
