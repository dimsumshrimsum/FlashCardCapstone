import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
function Study() {
  const { deckId } = useParams();

  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewFront, setViewFront] = useState(true);
  const [hideNext, setHideNext] = useState(true);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDeck() {
      try {
        const data = await readDeck(deckId, signal);
        console.log(data);
        setDeck(data);
        setCurrentIndex(0);
      } catch (error) {
        console.log(error);
      }
    }

    getDeck();

    return () => {
      abortController.abort();
    };
  }, []);

  function handleFlipClick() {
    setViewFront(!viewFront);
    setHideNext(!hideNext);
  }

  function handleNextClick() {
    if (currentIndex >= deck.cards.length - 1) {
      console.log("index check working");
      const confirm = window.confirm(
        "Restart cards? \n Click cancel to return to the home page"
      );
      if (confirm) {
        setCurrentIndex(0);
        setViewFront(true);
      } else if (!confirm) {
        history.push("/");
      }
    } else if (currentIndex < deck.cards.length - 1) {
      setCurrentIndex((prevIndex) => {
        return prevIndex + 1;
      });
      setViewFront(true);
      setHideNext(true);
      console.log(currentIndex);
    }
  }

  function handleRestart() {
    const confirm = window.confirm(
      "Restart cards? \n Click cancel to return to the home page"
    );
    if (confirm) {
      setCurrentIndex(0);
      setViewFront(true);
    }
    if (!confirm) {
      history.push("/");
    }
  }

  if (deck.cards && 3 > deck.cards.length) {
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
            <li className="breadcrumb-item">
              {" "}
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>{" "}
            </li>
            <li className="breadcrumb-item">Study</li>
          </ol>
        </nav>
        <h1>{`${deck.name}: Study`}</h1>

        <h2 className="alert alert-warning">Not enough cards</h2>
        <p className="ml-4">
          Minimum of 3 cards in a deck, please add {3 - deck.cards.length} more
          card&#40;s&#41;!
        </p>

        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-info ml-4">
          <i class="bi bi-plus-circle-fill mr-1"></i> Add Cards
        </Link>
      </div>
    );
  }

  if (deck.cards) {
    const card = deck.cards && deck.cards[currentIndex];

    return (
      <div>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              {" "}
              <Link to="/">
                <i class="bi bi-house-fill"></i> Home
              </Link>{" "}
            </li>
            <li className="breadcrumb-item">
              {" "}
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>{" "}
            </li>
            <li className="breadcrumb-item">Study</li>
          </ol>
        </nav>
        <h1>{`${deck.name}: Study`}</h1>
        <div className="card">
          <div className="card-header">
            <h2>{`Card ${currentIndex + 1} of ${deck.cards.length}`}</h2>
          </div>
          <div className="card-body">
            {viewFront ? <h2> {card.front}</h2> : <h2>{card.back}</h2>}
            <button onClick={handleFlipClick} className="btn btn-primary mr-2">
              FLIP
            </button>
            {hideNext ? null : (
              <button onClick={handleNextClick} className="btn btn-primary">
                NEXT
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  //else if (deck.cards) {
  //   handleRestart();
  // }
  return <h1>LOADING...</h1>;
}

export default Study;
