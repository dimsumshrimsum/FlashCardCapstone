import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import CardForm from "./CardFrom";
function EditCard({ deckId, deck, handleChangeToCards }) {
  const { cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({});
  const [initialFormData, setInitialFormData] = useState({
    front: "",
    back: "",
    deckId: deckId,
    id: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getCard() {
      try {
        const data = await readCard(cardId, signal);

        setCard(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getCard();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const initialFormData = {
      front: card.front,
      back: card.back,
      id: card.id,
      deckId: card.deckId,
    };
    setInitialFormData(initialFormData);
  }, [card]);

  async function editCard(card) {
    await updateCard(card);
    handleChangeToCards();
    history.push(`/decks/${deckId}`);
  }

  function handleCancelButtonClick() {
    handleChangeToCards();
    history.push(`/decks/${deckId}`);
  }
  if (isLoading) {
    return <h1>LOADINGGG...</h1>;
  }

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {" "}
            <Link to="/">Home</Link>{" "}
          </li>
          <li className="breadcrumb-item">
            {" "}
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>{" "}
          </li>
          <li className="breadcrumb-item">Edit Card {cardId} </li>
        </ol>
      </nav>
      <div>
        <CardForm
          header="Edit Card"
          initialFormData={initialFormData}
          altButtonText="Cancel"
          altButtonHandler={handleCancelButtonClick}
          submitHandler={editCard}
        />
      </div>
    </div>
  );
}

export default EditCard;
