import React, { Suspense } from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import NotFoundView from "../components/notFoundView/notFoundView";
import "./App.css";

const Groups = React.lazy(() => import("../components/groups/groups"));
const Gallery = React.lazy(() => import("../components/gallery/gallery")); //lazy loading...

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Redirect exact from="/" to="/groups" />
          <Route component={Groups} exact path="/groups" />
          <Route component={Gallery} exact path="/gallery/:id" />
          <Route component={NotFoundView} exact path="/not-found" />
          <Redirect to="/not-found" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
