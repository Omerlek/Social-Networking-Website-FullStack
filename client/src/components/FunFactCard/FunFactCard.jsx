import React, { useState } from 'react';
import './FunFactCard.css';

const funFacts = {
  Programming: [
    "🧠 The first computer programmer was Ada Lovelace — in the 1800s.",
    "👾 JavaScript was created in just 10 days.",
    "🐞 The term 'debugging' came from a real bug in a computer.",
  ],
  Music: [
    "🎸 The most expensive musical instrument ever sold was a Stradivarius violin for $16M.",
    "🎧 Mozart wrote his first symphony at the age of 8.",
    "🎹 Listening to music can improve memory and focus.",
  ],
  Sports: [
    "⚽ The FIFA World Cup is the most-watched sporting event in the world.",
    "🏀 Michael Jordan was cut from his high school basketball team.",
    "🏋️‍♂️ Weightlifting was part of the first modern Olympics in 1896.",
  ]
};

const categories = Object.keys(funFacts);

const getRandomFact = (category) => {
  const facts = funFacts[category];
  return facts[Math.floor(Math.random() * facts.length)];
};

const FunFactCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Programming");
  const [fact, setFact] = useState(getRandomFact("Programming"));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFact(getRandomFact(category));
  };

  const handleNewFact = () => {
    let newFact;
    do {
      newFact = getRandomFact(selectedCategory);
    } while (newFact === fact);
    setFact(newFact);
  };

  return (
    <div className="FunFactCard">
      <h3>💬 Fun Fact: {selectedCategory}</h3>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={category === selectedCategory ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <p>{fact}</p>

      <button className="refresh-btn" onClick={handleNewFact}>
        🔄 New Fact
      </button>
    </div>
  );
};

export default FunFactCard;
