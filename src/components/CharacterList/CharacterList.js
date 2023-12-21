import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CharacterList.css";
import { Link } from "react-router-dom";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${currentPage}`
        );
        setCharacters(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCharacters();
  }, [currentPage]);

  const handlePagination = (itm) => {
    setCurrentPage((item) => (itm === "next" ? item + 1 : item - 1));
  };

  const toggleFavorite = (value) => {
    const updatedFavorites = favorites.includes(value)
      ? favorites.filter((fav) => fav !== value)
      : [...favorites, value];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold mb-4">Star Wars Characters</h1>
      <ul>
        {characters.map((character, index) => (
          <li key={character.name} className="border p-4 mb-4 rounded shadow">
            <div className="flex justify-between items-center">
              <span className="text-xl">
                <Link to={`/characters/${index}`}>{character.name}</Link>
              </span>
              <button
                onClick={() => toggleFavorite(character)}
                className={`px-4 py-2 rounded ${
                  favorites.includes(character)
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                } text-white`}
              >
                {favorites.includes(character)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <button
          onClick={() => handlePagination("prev")}
          disabled={currentPage === 1}
          className={`px-4 py-2 mr-2 ${
            currentPage === 1 ? "bg-gray-500" : "bg-blue-500"
          } text-white rounded`}
        >
          Previous
        </button>
        <button
          onClick={() => handlePagination("next")}
          disabled={currentPage === 9}
          className={`px-4 py-2 ${
            currentPage === 9 ? "bg-gray-500" : "bg-blue-500"
          } text-white rounded`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
