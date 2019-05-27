import React from "react";
import Tooltip from "rc-tooltip";

const CountryFlag = props => {
  return (
    <Tooltip
      placement="top"
      overlay={props.country.name}
      overlayStyle={{
        opacity: 1
      }}
      align={{
        offset: [0, 2]
      }}
    >
      <span key={props.country.id} className="mr-1">
        {props.country.flagEmoji}
      </span>
    </Tooltip>
  );
};

export default CountryFlag;
