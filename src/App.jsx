import { useState } from "react";
import "./App.css";
import { Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Signup from "./pages/Auth/Signup";
import { ChatState } from "./context/ChatContext";

function App() {
  const { user } = ChatState();
  return (
    <>
      <Container maxW="container.xl" w="100%" p={0} centerContent bg="white">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="login"
            element={user ? <Navigate to={"/"} /> : <Auth />}
          />
          <Route
            path="signup"
            element={user ? <Navigate to={"/"} /> : <Signup />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
