import React from "react";
import ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>
);
