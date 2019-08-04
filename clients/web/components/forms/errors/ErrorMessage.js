import React, { useState } from "react";

import classNames from "classnames";

const ErrorMessageContainer = props => {
  const [show, setShow] = useState(true);
  return (
    <div
      className={classNames(
        "bg-red-500 text-white font-bold p-3 border border-red-700 rounded-lg my-5 relative",
        { hidden: !show }
      )}
    >
      {props.children}
      <span
        className="cursor-pointer absolute top-0 right-0 mr-4 mt-1 text-xl"
        onClick={() => setShow(false)}
      >
        &times;
      </span>
    </div>
  );
};

const ErrorMessage = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return (
      <ErrorMessageContainer>
        {error.networkError.result.errors.map((error, i) => (
          <p key={i}>{error.message.replace("GraphQL error: ", "")}</p>
        ))}
      </ErrorMessageContainer>
    );
  }
  return (
    <ErrorMessageContainer>
      <p>{error.message.replace("GraphQL error: ", "")}</p>
    </ErrorMessageContainer>
  );
};

ErrorMessage.defaultProps = {
  error: {}
};

export default ErrorMessage;
