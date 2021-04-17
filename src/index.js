import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';

import {Route, Switch, BrowserRouter} from "react-router-dom";

import './index.css';
import CreateTopicRoute from "./routes/createTopic";
import LoginRoute from "./routes/login";
import TopicsRoute from "./routes/topics";
import ViewTopicRoute from "./routes/viewTopic";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <TopicsRoute/>
        </Route>
        <Route path="/login" exact>
          <LoginRoute/>
        </Route>
        <Route path="/topic/new" exact>
          <CreateTopicRoute/>
        </Route>
        <Route path="/topic/:topicId" exact>
          <ViewTopicRoute/>
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
