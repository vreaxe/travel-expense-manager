import React from "react";

const ErrorFieldContainer = props => {
  return <div className="text-red-500 font-bold mt-2">{props.children}</div>;
};

const ErrorField = ({ error, field }) => {
  if (error && error.graphQLErrors && error.graphQLErrors.length) {
    return (
      <ErrorFieldContainer>
        {error.graphQLErrors.map((errorItem, i) => {
          if (
            errorItem.type == "ValidationError" &&
            errorItem.extensions &&
            errorItem.extensions.form_errors &&
            Object.keys(errorItem.extensions.form_errors).length
          ) {
            if (errorItem.extensions.form_errors[field]) {
              return errorItem.extensions.form_errors[field].map(
                (errorText, x) => {
                  return (
                    <p key={i}>{errorText[0].replace("GraphQL error: ", "")}</p>
                  );
                }
              );
            }
          }
        })}
      </ErrorFieldContainer>
    );
  }
  return null;
};

ErrorField.defaultProps = {
  error: {},
  field: ""
};

export default ErrorField;
