import PropTypes from "prop-types";
import React from "react";

const Pencil = props => {
  return (
    <span
      data-cy="pencil"
      className={`cursor-pointer emoji ${props.className || ""}`}
      onClick={props.onClick}
    >
      ✏️
    </span>
  );
};

Pencil.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Pencil;
