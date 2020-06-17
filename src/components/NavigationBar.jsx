import React from "react";

// Stateless Functional Component
const NavigationBar = ({ title }) => {
  return (
    <nav className="app-header">
      <span>{title}</span>
    </nav>
  );
};

export default NavigationBar;
