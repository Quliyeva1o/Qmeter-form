import React from "react";

const Texts = ({text , color}) => {
  return (
    <div
      style={{
        backgroundColor: color,
        height: 100,
        width: 100,
      }}
    >
      {text}
    </div>
  );
};

export default Texts;
