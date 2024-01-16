import React from "react";
import { Flex, Container } from "@chakra-ui/react";
import ChatList from "../../components/ChatList";
import ChatBox from "../../components/ChatBox";
import SocketProvider from "../../context/SocketProvider";

const App = () => {
  return (
    <SocketProvider>
      <Container minW={"100%"} h={"100vh"} p={0} boxShadow="sm">
        {/* <Flex flexDir="column" h="100%" overflow="hidden"> */}
        {/* <Navbar /> */}
        <Flex h="100%">
          <ChatList />
          <ChatBox />
        </Flex>
        {/* </Flex> */}
      </Container>
    </SocketProvider>
  );
};

export default App;
