import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import ChatMessages from "../../components/ChatMessages";
import ChatList from "../../components/ChatList";
import Navbar from "../../components/Navbar";
import DrawerContextProvider from "../../context/DrawerContext";
import ChatBox from "../../components/ChatBox";

const App = () => {
  return (
    <DrawerContextProvider>
      <Container minW={"100%"} h={"100vh"} p={0} boxShadow="sm">
        {/* <Flex flexDir="column" h="100%" overflow="hidden"> */}
        {/* <Navbar /> */}
        <Flex h="100%">
          <ChatList />
          <ChatBox />
        </Flex>
        {/* </Flex> */}
      </Container>
    </DrawerContextProvider>
  );
};

export default App;
