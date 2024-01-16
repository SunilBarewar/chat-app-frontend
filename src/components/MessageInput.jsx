import {
  Box,
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineAttachFile, MdSend } from "react-icons/md";
import { useSocket } from "../context/SocketProvider";
import { useRef } from "react";
import { useChat } from "../context/ChatContext";

const MessageInput = () => {
  const { sendMessage } = useSocket();
  const { selectedChat, user } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const fileInputRef = useRef(null);

  return (
    <Flex bg={"gray.50"} p={"8px"} gap={2}>
      <Box>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          //   onChange={handleFileChange}
          accept="image/*"
        />

        <IconButton
          icon={
            <MdOutlineAttachFile
              fontSize={"25px"}
              //   onClick={handleButtonClick}
            />
          }
        />
      </Box>
      <InputGroup>
        <FormControl
          onKeyDown={(event) => {
            if (event.key === "Enter" && newMessage) {
              const formData = {
                content: newMessage,
                contentType: "text",
                chatID: selectedChat.id,
                senderID: user.id,
              };
              sendMessage(formData);
            }
          }}
        >
          <Input
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </FormControl>

        <InputRightElement>
          <IconButton
            icon={
              <MdSend
                fontSize={"25px"}
                onClick={() => {
                  if (!newMessage) return;
                  const formData = {
                    content: newMessage,
                    contentType: "text",
                    chatID: selectedChat.id,
                    senderID: user.id,
                  };
                  sendMessage(formData);
                }}
              />
            }
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default MessageInput;
