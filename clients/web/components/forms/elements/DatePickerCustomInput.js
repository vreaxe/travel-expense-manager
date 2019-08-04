import React from "react";

class DatePickerCustomInput extends React.Component {
  render() {
    return (
      <input
        className="w-full rounded-lg border border-gray-400 p-3 hover:border-gray-500 focus:border-green-500 input-color-shadow"
        onClick={this.props.onClick}
        onChange={this.props.onChange}
        value={this.props.value}
      />
    );
  }
}

export default DatePickerCustomInput;
