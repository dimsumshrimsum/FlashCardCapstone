import React, { useEffect, useState } from "react";
import { deleteDeck, listDecks } from "../utils/api";
import DeckCard from "./DeckCard";
import { Link } from "react-router-dom";

function DecksList() {
  const [decks, setDecks] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDecks() {
      try {
        const response = await listDecks(signal);

        setDecks(response);
      } catch (error) {
        console.log(error);
      }
    }

    getDecks();

    return () => {
      abortController.abort();
    };
  }, [rerender]);

  async function handleDeleteDeckClick(deckId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deck? \n This action cannot be undone!"
    );

    if (confirmDelete) {
      try {
        await deleteDeck(deckId);
        setRerender(!rerender);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container">
      <div className="jumbotron pt-3 pb-3">
        <h4>Click "Study" to start studying your deck! </h4>
        <h4>Click "View" to view the entire deck! </h4>
        <h4>Click "Create Deck" below to create a new deck!</h4>

        <hr class="my-4" />
        <Link to="/decks/new" className="btn btn-primary btn-block mb-3 ">
          Create Deck{"   "}
          <i class="bi bi-emoji-heart-eyes"></i>
          <span class="badge badge-light badge-pill ml-2">
            {decks.length} total
          </span>
        </Link>
      </div>
      <div className="card-deck">
        {decks.map((deck) => {
          return (
            <DeckCard
              key={deck.id}
              deck={deck}
              handleDeleteDeckClick={handleDeleteDeckClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DecksList;
