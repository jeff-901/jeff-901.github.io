import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import { split } from "@apollo/client"; //"apollo-link";
import { HttpLink } from "@apollo/client"; //"apollo-link-http";
import { WebSocketLink } from "@apollo/client/link/ws"; //"apollo-link-ws";
import { getMainDefinition } from "@apollo/client/utilities"; //"apollo-utilities";
import { ApolloClient, InMemoryCache } from "@apollo/client/core"; //"apollo-boost";

// const httpLink = new HttpLink({
//   uri: "http://localhost:4000/",
// });

// // Create a WebSocket link:
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/`,
//   options: { reconnect: true },
// });

// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache().restore({}),
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
