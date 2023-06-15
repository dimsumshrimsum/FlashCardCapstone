import React from "react";
import { Link } from "react-router-dom";
//this formats each deck when displayed on the home page, it is called form DECKSLIST
function DeckCard({ deck, handleDeleteDeckClick }) {
  console.log(deck.cards.length, "cards?");
  return (
    <div className="card border border-info m-2">
      <div className="card-body">
        <h3 className="card-title text-center">{deck.name}</h3>
        <p className="card-text text-center">{deck.description}</p>
        <p className="text-center"> {`${deck.cards.length} cards `} </p>
      </div>
      <div className="card-footer text-center">
        <div className="btn-group mb-1 mr-1">
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            STUDY <i class="bi bi-book-half"></i>
          </Link>
          <Link to={`/decks/${deck.id}`} className="btn btn-primary">
            VIEW <i class="bi bi-eyeglasses"></i>
          </Link>
        </div>
        <button
          onClick={() => handleDeleteDeckClick(deck.id)}
          className="btn btn-danger mb-1"
        >
          DELETE <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default DeckCard;
