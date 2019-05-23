import React from "react";
import Tippy from "@tippy.js/react";

const CountryFlag = props => {
  return (
    <Tippy content={props.country.name} arrow={true}>
      <span key={props.country.id} className="mr-1">
        {props.country.flagEmoji}
      </span>
    </Tippy>
  );
};

export default CountryFlag;
