// src/components/molecules/Header.tsx
import React from "react";
import HeaderLogo from "../atoms/HeaderLogo";

const Header: React.FC = () => {
  return (
    <header className="header">
      <HeaderLogo />
      <h1>Chef Claude</h1>
    </header>
  );
};

export default Header;
