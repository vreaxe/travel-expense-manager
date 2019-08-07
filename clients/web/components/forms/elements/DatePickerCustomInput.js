import React from "react";

const DatePickerCustomInput = props => {
  return (
    <input
      className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
      onClick={props.onClick}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export default DatePickerCustomInput;
