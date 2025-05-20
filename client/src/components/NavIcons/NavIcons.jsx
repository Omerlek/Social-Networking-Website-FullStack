import React from "react";
import { Link } from "react-router-dom";
import {
  UilHome,
  UilSetting,
  UilBell,
  UilCommentDots
} from "@iconscout/react-unicons";

const NavIcons = () => {
  const iconColor = "#2c6e91";
  const iconSize = 24;

  return (
    <div className="navIcons">
      <Link to="/home">
        <UilHome color={iconColor} size={iconSize} />
      </Link>

      <Link to="/settings">
        <UilSetting color={iconColor} size={iconSize} />
      </Link>

      <Link to="/notifications">
        <UilBell color={iconColor} size={iconSize} />
      </Link>

      <Link to="/chat">
        <UilCommentDots color={iconColor} size={iconSize} />
      </Link>
    </div>
  );
};

export default NavIcons;

