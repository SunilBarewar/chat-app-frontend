import React, { useContext, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Tooltip,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { MdOutlineGroupAdd, MdSearch } from "react-icons/md";
import { ChatState } from "../context/ChatContext";
import SearchDrawer from "./SearchDrawer";
import MyChats from "./MyChats";
import GroupModal from "./Modals/GroupModal";

const ChatList = () => {
  const { selectedChat, setSelectedChat } = ChatState();

  return (
    <Box
      bg={"green.100"}
      w={{ base: "100%", md: "350px" }}
      display={{ base: `${selectedChat ? "none" : "flex"}`, md: "flex" }}
    >
      <Box
        w="100%"
        bg="white"
        h={"100%"}
        overflow={"hidden"}
        position={"relative"}
        display={{ base: `${selectedChat ? "none" : "flex"}`, md: "flex" }}
        flexDirection={"column"}
        pos={"relative"}
      >
        <Divider orientation="vertical" pos="absolute" right={0} />
        <Box w="100%">
          <Flex
            p={"8px"}
            columnGap={"1rem"}
            bg="gray.50"
            justifyContent="space-between"
          >
            <Avatar src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg" />

            <HStack>
              <SearchDrawer>
                <Tooltip
                  hasArrow
                  label="New chat"
                  bg="gray.300"
                  color="black"
                  placement="bottom-end"
                >
                  <IconButton icon={<MdSearch fontSize={"25px"} />} />
                </Tooltip>
              </SearchDrawer>
              <GroupModal>
                <Tooltip
                  hasArrow
                  label="New group"
                  bg="gray.300"
                  color="black"
                  placement="bottom-end"
                >
                  <IconButton icon={<MdOutlineGroupAdd fontSize={"25px"} />} />
                </Tooltip>
              </GroupModal>
            </HStack>
          </Flex>

          <Divider />
          <MyChats />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatList;
