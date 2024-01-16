import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import getChatMember from "../utils/getChatMember";
import { useChat } from "../context/ChatContext";

const MessageBoxNav = () => {
  const { selectedChat, setSelectedChat, user } = useChat();
  return (
    <Flex
      p={"8px"}
      bg="gray.50"
      borderLeft={"1px"}
      borderLeftColor={"gray.300"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"} gap={4}>
        <Avatar
          bg="teal.500"
          src={
            selectedChat.isGroupChat
              ? ""
              : getChatMember(selectedChat.members, user.id).profilePic
          }
        />

        <Text noOfLines={1} color={"gray.900"}>
          {selectedChat.isGroupChat
            ? selectedChat.chatName
            : getChatMember(selectedChat.members, user.id).name}
        </Text>
      </Flex>

      <Menu isLazy>
        <MenuButton>
          <BsThreeDotsVertical fontSize={20} />
        </MenuButton>
        <MenuList boxSize={"50px"}>
          <MenuItem onClick={() => setSelectedChat("")}>Close chat</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default MessageBoxNav;
