import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
  return (
    <div
      className={`${classes.control} ${
        props.inputValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.stateHandler}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
