import React from "react";
import "./CustomButton.css";

const CustomButton = ({ label, onClick /*type = "button"*/ }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;
