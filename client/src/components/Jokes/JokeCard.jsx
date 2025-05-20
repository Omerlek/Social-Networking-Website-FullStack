import React, { useState } from "react";
import axios from "axios";
import "./JokeCard.css";

const JokeCard = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch a random joke from the API
  const fetchJoke = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
      setJoke(data);
    } catch (err) {
      console.error("Error fetching joke", err);
      setJoke(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="joke-card">
      <h3>Random Joke</h3>
      <button onClick={fetchJoke} className="joke-button">Get a Joke</button>

      {loading && <p>Loading...</p>}

      {joke && (
        <div className="joke-result">
          <p>{joke.joke}</p>
        </div>
      )}
    </div>
  );
};

export default JokeCard;
