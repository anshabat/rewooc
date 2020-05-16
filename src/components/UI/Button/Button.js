import "./Button.scss";
import React from "react";

const Button = (props) => {

  const {
    size = "md",
    color = "secondary",
    className = "",
    children,
    ...restProps
  } = props;

  return (
    <button
      className={`pc-button pc-button--${size} pc-button--${color} ${className}`.trim()} {...restProps}>
      <span>{props.children}</span>
    </button>
  );
};

export default Button;