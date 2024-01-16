import React from "react";
import { useChat } from "../context/ChatContext";
import ChatMessages from "./ChatMessages";
import { Box, Center, Text } from "@chakra-ui/react";
const ChatBox = () => {
  const { selectedChat } = useChat();
  return (
    <Box
      flex={1}
      flexDir={"column"}
      display={{ base: `${selectedChat ? "flex" : "none"}`, md: "flex" }}
      position={"relative"}
      alignItems="center"
      justifyContent="center"
      h="100%"
      w="100%"
    >
      {selectedChat ? (
        <ChatMessages />
      ) : (
        <Center
          backgroundImage="url('chat_bg.jpg')"
          bgSize="100%"
          h="100%"
          w="100%"
        >
          <Text fontSize="3xl" pb={3}>
            Click on a user to start chatting
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default ChatBox;
