import React from "react";
import PropTypes from "prop-types";

const RowLoader = props => {
  const { height, width, marginBottom, bgColor, number } = props;
  const arrayNumber = [...Array(number).keys()];
  const styles = {
    height,
    width,
    marginBottom,
    backgroundColor: bgColor
  };

  return arrayNumber.map((v, i) => <div style={{ ...styles }} key={i} />);
};

RowLoader.defaultProps = {
  height: "50px",
  width: "100%",
  marginBottom: "10px",
  bgColor: "#E5E8EB",
  number: 1
};

RowLoader.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  marginBottom: PropTypes.string,
  bgColor: PropTypes.string.isRequired,
  number: PropTypes.string
};

export default RowLoader;
