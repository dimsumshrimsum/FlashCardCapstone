import React from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const history = useHistory();
  let initialFormData = {
    name: "",
    description: "",
  };

  async function addDeck(deck) {
    const response = await createDeck(deck);

    history.push(`/decks/${response.id}`);
  }

  async function cancelButtonBackToHome() {
    history.push("/");
  }

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {" "}
            <Link to="/">
              <i class="bi bi-house-fill"></i> Home{" "}
            </Link>{" "}
          </li>
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>
      <DeckForm
        header="Create Deck"
        initialFormData={initialFormData}
        submitHandler={addDeck}
        altButtonHandler={cancelButtonBackToHome}
      />
    </div>
  );
}

export default CreateDeck;
