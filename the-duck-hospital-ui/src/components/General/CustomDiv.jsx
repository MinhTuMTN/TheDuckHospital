import React from "react";

const CustomDiv = () => {
  return (
    <div
      style={{
        width: 14,
        height: 14,
        position: "absolute",
        borderBottomLeftRadius: "3.5px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        border: "1px solid rgba(145, 158, 171, 0.204)",
        top: -6.6,
        left: 20,
        transform: "rotate(135deg)",
        backdropFilter: "blur(6px)",
        clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
      }}
    />
  );
};

export default CustomDiv;
