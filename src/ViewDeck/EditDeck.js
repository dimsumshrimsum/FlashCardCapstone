import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DeckForm from "../CreateDeck/DeckForm";
import { readDeck, updateDeck } from "../utils/api";
function EditDeck({ deckId, handleChangeToDeck }) {
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [initialFormData, setInitialFormData] = useState({
    name: "",
    description: "",
    id: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDeck() {
      try {
        const data = await readDeck(deckId, signal);

        setDeck(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getDeck();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const initialFormData = {
      name: deck.name,
      description: deck.description,
      id: deck.id,
    };
    setInitialFormData(initialFormData);
  }, [deck]);

  async function editDeck(deck) {
    await updateDeck(deck);
    handleChangeToDeck();
    history.push(`/decks/${deckId}`);
  }

  function handleCancelButtonClick() {
    handleChangeToDeck();
    history.push(`/decks/${deckId}`);
  }

  if (isLoading) {
    return <h1>LOADINGGG...</h1>;
  }

  return (
    <div>
      <DeckForm
        header="Edit Deck"
        initialFormData={initialFormData}
        altButtonHandler={handleCancelButtonClick}
        submitHandler={editDeck}
      />
    </div>
  );
}

export default EditDeck;
