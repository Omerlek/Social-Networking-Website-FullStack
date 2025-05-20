import React from "react";
import './LogoSearch.css';
import { UilSearch, UilCompass } from '@iconscout/react-unicons';

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <div className="logo-icon">
        <UilCompass color="#2c6e91" size="32" />
      </div>
      <div className="Search">
        <input type="text" placeholder="#Explore" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
