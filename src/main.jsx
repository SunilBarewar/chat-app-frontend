import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import ChatContextProvider from "./context/ChatContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatContextProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </ChatContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
