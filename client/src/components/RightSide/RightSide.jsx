import React, { useState } from "react";
import "./RightSide.css";


import FunFactCard from "../FunFactCard/FunFactCard";
import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";
import TimeSpent from "../TimeSpent/TimeSpent";
import JokeCard from "../Jokes/JokeCard";
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      {/* Side Navbar */}

      <NavIcons />
      {/* TrendCard */}
  
      <TimeSpent />
      <JokeCard />
      <FunFactCard />

      {/* Share buttong */}
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
