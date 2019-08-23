import PropTypes from "prop-types";
import React from "react";
import Tooltip from "rc-tooltip";

const FAB = props => {
  return (
    <div id="fab" className="fixed" style={props.position}>
      <Tooltip
        placement="top"
        trigger={["hover"]}
        overlay={props.tooltipContent ? props.tooltipContent : ""}
        overlayStyle={{
          opacity: 1,
          display: typeof props.tooltipContent === "undefined" ? "none" : null
        }}
        align={{
          offset: [0, 2]
        }}
      >
        <div
          className="flex items-center text-center bg-green-500 hover:bg-green-600 active:bg-green-700 h-16 w-16 rounded-full shadow-lg cursor-pointer"
          onClick={props.onClick}
        >
          {props.children}
        </div>
      </Tooltip>
    </div>
  );
};

FAB.propTypes = {
  position: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default FAB;
