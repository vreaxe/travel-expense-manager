import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";

const Trash = props => {
  return (
    <span
      className={classNames(props.className, { spinner: props.loading })}
      onClick={props.onClick}
    >
      🗑️
    </span>
  );
};

Trash.propTypes = {
  loading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default Trash;
