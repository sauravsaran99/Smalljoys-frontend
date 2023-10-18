// ButtonComponent.js
import React from "react";
import styles from "./ButtonComponent.module.css";

const ButtonComponent = ({ onClick, children }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonComponent;
