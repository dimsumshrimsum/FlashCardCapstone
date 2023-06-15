import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
function ViewDeckCard({ card, handleDeleteCardClick }) {
  return (
    <div className="card ">
      <div className="card-body">
        <p className="card-text">{card.front} </p>
        <p className="card-text"> {card.back} </p>
      </div>
      <div className="card-footer">
        <Link
          to={`/decks/${card.deckId}/cards/${card.id}/edit`}
          className="btn btn-secondary mr-2"
        >
          EDIT
        </Link>
        <button
          onClick={() => handleDeleteCardClick(card.id)}
          className="btn btn-danger"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default ViewDeckCard;
