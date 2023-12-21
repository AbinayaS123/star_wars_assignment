import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "./Modal"; 
import "./CharacterDetails.css";

const CharacterDetails = () => {
  const { index } = useParams();
  const [character, setCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const Response = await axios.get(`https://swapi.dev/api/people/${index}/`);
        setCharacter(Response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCharacterDetails();
  }, [index]);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  if (!character || !character.name) {
    return <div>No details found for character with index {index}</div>;
  }
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
      <button onClick={openModal} className="modal-trigger-button">
        Show Basic Details
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Basic Details:</h2>
        <p>Height:&nbsp; {character.height} cm</p>
        <p>Mass: &nbsp;{character.mass} kg</p>
        <p>Gender: &nbsp;{character.gender}</p>
      </Modal>
    </div>
  );
};

export default CharacterDetails;
