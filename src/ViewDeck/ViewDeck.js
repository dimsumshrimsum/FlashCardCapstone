import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import { deleteCard, readDeck, deleteDeck } from "../utils/api";
import AddCards from "./AddCards";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";
import ViewDeckCard from "./ViewDeckCard";
function ViewDeck() {
  const { deckId } = useParams();

  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDeck() {
      try {
        const data = await readDeck(deckId, signal);

        setDeck(data);
      } catch (error) {
        console.log(error);
      }
    }

    getDeck();

    return () => {
      abortController.abort();
    };
  }, [rerender]);

  async function handleDeleteDeck(deckId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (confirmDelete) {
      await deleteDeck(deckId);

      history.push("/");
    }
  }

  function handleChangeToCards() {
    setRerender(!rerender);
  }

  function handleChangeToDeck() {
    setRerender(!rerender);
  }

  async function handleDeleteCardClick(cardId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this card?"
    );

    if (confirmDelete) {
      await deleteCard(cardId);
      setRerender(!rerender);
    }
  }

  if (deck.cards) {
    const cards = deck.cards;
    return (
      <div>
        <Switch>
          <Route exact path="/decks/:deckId">
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {" "}
                  <Link to="/">
                    {" "}
                    <i className="bi bi-house-fill"></i> Home
                  </Link>{" "}
                </li>
                <li className="breadcrumb-item">{deck.name}</li>
              </ol>
            </nav>
            <div className="card">
              <div className="card-header">
                <h1>{deck.name} </h1>
                <div className="card-body">
                  <h2>{deck.description} </h2>
                </div>
              </div>
              <div className="card-footer">
                <Link
                  to={`/decks/${deckId}/edit`}
                  className="btn btn-primary mr-1"
                >
                  Edit
                </Link>
                <Link
                  to={`/decks/${deckId}/study`}
                  className="btn btn-secondary mr-1"
                >
                  Study
                </Link>
                <Link
                  to={`/decks/${deckId}/cards/new`}
                  className="btn btn-info"
                >
                  Add Cards
                </Link>
              </div>
            </div>
            <div className="container mb-3">
              <h1>Cards</h1>
              {/* //this delete is sending back up to the parent function and i believe is deleting/filtering the use state proerly, but is not refleciting on the deck view */}
              <button
                className="btn btn-danger mb-3"
                onClick={() => handleDeleteDeck(deckId)}
              >
                {" "}
                <i className="bi bi-trash-fill"></i> DELETE
              </button>
              <div className="container">
                <div className="card-deck">
                  {cards.map((card, index) => {
                    return (
                      <ViewDeckCard
                        key={index}
                        card={card}
                        deck={deck}
                        handleDeleteCardClick={handleDeleteCardClick}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </Route>
          <Route path="/decks/:deckId/edit">
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  {" "}
                  <Link to="/">Home</Link>{" "}
                </li>
                <li className="breadcrumb-item">
                  {" "}
                  <Link to={`/decks/${deckId}`}>
                    <span onClick={handleChangeToDeck}>{deck.name}</span>
                  </Link>{" "}
                </li>
                <li className="breadcrumb-item">Edit Deck</li>
              </ol>
            </nav>
            <EditDeck deckId={deckId} handleChangeToDeck={handleChangeToDeck} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
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
                <li className="breadcrumb-item">Add Card</li>
              </ol>
            </nav>
            <AddCards
              deckId={deckId}
              handleChangeToCards={handleChangeToCards}
            />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard
              deckId={deckId}
              deck={deck}
              handleChangeToCards={handleChangeToCards}
            />
          </Route>
        </Switch>
      </div>
    );
  }
  return <h1>LOADINGG....</h1>;
}

export default ViewDeck;
