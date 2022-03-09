import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import client from "./config/config.js";
import { Provider } from "react-redux";
import store from "./state-management/store";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <App />
       </ApolloProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
