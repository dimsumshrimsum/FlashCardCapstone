import React from "react";
import { useHistory } from "react-router-dom";
import { createCard } from "../utils/api";
import CardForm from "./CardFrom";
function AddCards({ deckId, handleChangeToCards }) {
  const history = useHistory();
  let initialFormData = {
    front: "",
    back: "",
  };
  async function addCard(card) {
    await createCard(deckId, card);
  }
  function goToDeck() {
    handleChangeToCards();
    history.push(`/decks/${deckId}`);
  }
  return (
    <div className="container">
      <CardForm
        header="Create Card"
        initialFormData={initialFormData}
        altButtonHandler={goToDeck}
        altButtonText="Done"
        submitHandler={addCard}
      />
    </div>
  );
}

export default AddCards;
