import "./Message.scss";
import React from "react";

const Message = props => {
  const {children, type = "default"} = props;

  return (
    <div className={`rw-message rw-message--${type}`}>
      {children}
    </div>
  );
};

export default Message;