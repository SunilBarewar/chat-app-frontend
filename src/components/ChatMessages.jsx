// ChatMessages.js

import React, { useEffect, useRef, useState } from "react";
import { Flex, useToast } from "@chakra-ui/react";

import { useChat } from "../context/ChatContext";

import { uploadImage } from "../api/messageRequests";
import MessagesContainer from "./MessagesContainer";
import { useSocket } from "../context/SocketProvider";
import MessageBoxNav from "./MessageBoxNav";
import MessageInput from "./MessageInput";

const ChatMessages = () => {
  const { selectedChat } = useChat();
  const { joinRoom, messages } = useSocket();
  // const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // const messages = [
  //   { text: "Hey!", isSent: false },
  //   { text: "Hi! How's it going?", isSent: true },
  //   { text: "Not bad, thanks!", isSent: false },
  //   { text: "What have you been up to?", isSent: false },
  //   { text: "Just working on some projects. How about you?", isSent: true },
  //   {
  //     text: "Same here. Got any exciting plans for the weekend?",
  //     isSent: false,
  //   },
  //   { text: "Not sure yet. Maybe catch up on some movies.", isSent: true },
  //   { text: "Sounds like a plan. Any recommendations?", isSent: false },
  //   {
  //     text: "I recently watched a great sci-fi movie. Want me to send you the title?",
  //     isSent: true,
  //   },
  //   { text: "Sure, I'm always up for a good sci-fi flick!", isSent: false },
  //   {
  //     text: 'Awesome! It\'s called "Interstellar". Highly recommended!',
  //     isSent: true,
  //   },
  //   {
  //     text: "Oh, I love that movie! The soundtrack is amazing.",
  //     isSent: false,
  //   },
  //   {
  //     text: "Right? Hans Zimmer did a fantastic job with the music.",
  //     isSent: true,
  //   },
  //   {
  //     text: "Absolutely. By the way, did you finish reading that book?",
  //     isSent: false,
  //   },
  //   {
  //     text: "Not yet. It's quite a long one, but I'm enjoying it.",
  //     isSent: true,
  //   },
  //   {
  //     text: "Take your time. It's always nice to savor a good book.",
  //     isSent: false,
  //   },
  //   {
  //     text: "Definitely. Anyway, gotta get back to work. Catch you later!",
  //     isSent: true,
  //   },
  //   { text: "Sure thing! Have a productive day!", isSent: false },
  //   {
  //     text: "Hey, did you see the latest episode of that TV series?",
  //     isSent: true,
  //   },
  //   {
  //     text: "No, I haven't had a chance to watch it yet. How was it?",
  //     isSent: false,
  //   },
  //   {
  //     text: "It was mind-blowing! You won't believe what happened.",
  //     isSent: true,
  //   },
  //   {
  //     text: "Now you've got me intrigued. I'll watch it tonight for sure.",
  //     isSent: false,
  //   },
  //   { text: "Let me know what you think once you've seen it!", isSent: true },
  //   { text: "Absolutely. Can't wait!", isSent: false },
  // ];

  const socket = useRef(null);

  const fileInputRef = useRef(null);

  const handleFileChange = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || fileInput.files.length < 0) return;
    const convertToBase64 = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    };
    const file = fileInput.files[0];

    const extension = file.name.split(".").pop();
    const fileType = file.type;
    const convertedFile = await convertToBase64(file);

    const formData = {
      image: convertedFile,
      extension,
      fileType,
      chatId: selectedChat.id,
    };

    try {
      const { data } = await uploadImage(formData);
      setMessages([...messages, data]);

      socket.current.emit("new message", {
        message: data,
        chat: selectedChat,
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to send the Image Message",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
    }

    // socket.current.emit("send-image",);
  };
  const handleButtonClick = () => {
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.click();
    }
  };
  const toast = useToast();

  // const fetchMessages = async () => {
  //   try {
  //     // setLoading(true);
  //     // const { data } = await getMessagesOfUser(selectedChat.id);
  //     // setMessages(data);
  //     // setLoading(false);
  //     // console.log(data);
  //     socket.current?.emit("join chat", selectedChat.id);
  //   } catch (error) {
  //     toast({
  //       title: "Error Occured!",
  //       description: "Failed to Load the Messages",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //       position: "top right",
  //     });
  //   }
  // };

  // const sendMessage = async () => {
  //   if (!newMessage || !selectedChat) return;

  //   try {
  //     const formData = {
  //       content: newMessage,
  //       contentType: "text",
  //       chatID: selectedChat.id,
  //       senderID: user.id,
  //     };

  //     // const { data } = await saveMessage(formData);
  //     setNewMessage("");
  //     // setMessages([...messages, formData]);
  //     socket.current.emit("new.message", formData);
  //     // console.log(data);
  //   } catch (error) {
  //     toast({
  //       title: "Error Occured!",
  //       description: "Failed to send the Message",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //       position: "top right",
  //     });
  //   }
  // };
  // useEffect(() => {
  //   socket.current = io("http://localhost:5000");
  //   // socket.current.emit("setup", user);
  //   // socket.current.on("connected", () => setSocketConnected(true));
  // }, []);

  useEffect(() => {
    if (!selectedChat) return;
    // fetchMessages();
    joinRoom(selectedChat.id);
    // return () => {
    //   socket.current?.emit("close chat", selectedChat.id);
    // };
  }, [selectedChat]);

  // useEffect(() => {
  //   socket.current.on("new.message", (newMessageRecieved) => {
  //     console.log("received new message");
  //     if (
  //       !selectedChat || // if chat is not selected or doesn't match current chat
  //       selectedChat.id !== newMessageRecieved.chatID
  //     ) {
  //     } else {
  //       setMessages([...messages, newMessageRecieved]);
  //     }
  //   });
  // });
  return (
    <Flex
      flex="1"
      w="100%"
      flexDir={"column"}
      overflow={"hidden"}
      position={"relative"}
    >
      <MessageBoxNav />
      <MessagesContainer loading={loading} messages={messages} />
      <MessageInput />
    </Flex>
  );
};

export default ChatMessages;
