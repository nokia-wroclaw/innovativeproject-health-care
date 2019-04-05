import React from "react";

const SectionIcon = ({ className, onClick, color }) => {
  return (
    <i
      className={className}
      aria-hidden="true"
      style={{ fontSize: "1.3em", cursor: "pointer", marginRight: 8, color }}
      onClick={onClick}
    />
  );
};

export default SectionIcon;
