import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import CreateDeck from "../CreateDeck/CreateDeck";
import Home from "../Home/Home";
import Study from "../Study/Study";
import ViewDeck from "../ViewDeck/ViewDeck";
import Header from "./Header";
import NotFound from "./NotFound";
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
