import { Box, Spinner } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { ChatState } from "../context/ChatContext";

const MessagesContainer = ({ loading, messages }) => {
  const { user } = ChatState();
  const chatContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom of the chat container after rendering messages
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        h="100%"
        overflow={"hidden"}
        justifyContent="flex-end"
      >
        {loading ? (
          <Spinner
            size="xl"
            w={20}
            h={20}
            alignSelf="center"
            margin="auto"
            color="green.700"
            thickness="4px"
          />
        ) : (
          <Box
            flex={1}
            overflowY={"auto"}
            border={"8px solid"}
            borderColor={"gray.100"}
            borderRadius="sm"
            sx={{
              "&::-webkit-scrollbar": {
                width: "7px",
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                height: "5px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              backgroundImage: "url('chat_bg.jpg')",
              bgSize: "100%",
              padding: "20px 30px",
            }}
            ref={chatContainerRef}
          >
            {messages.map((message, index) => (
              <Message
                key={message.id}
                text={message.content}
                type={message.contentType}
                isSent={message.senderID === user.id}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default MessagesContainer;
