import React from "react";
import chefClaudeLogo from "../../assets/images/chef-claude-icon.png";

const HeaderLogo: React.FC<{ alt?: string }> = ({ alt = "Chef Claude" }) => (
  <img src={chefClaudeLogo} alt={alt} />
);

export default HeaderLogo;
