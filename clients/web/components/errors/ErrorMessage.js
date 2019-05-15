import React from "react";

const ErrorMessageContainer = props => {
  return (
    <div className="bg-red-500 text-white font-bold p-3 border border-red-700 rounded-lg my-5">
      {props.children}
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
