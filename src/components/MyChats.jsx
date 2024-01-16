import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react";
import { useChat } from "../context/ChatContext";
import { useEffect } from "react";
import { fetchChats } from "../api/chatRequests";
import getChatMember from "../utils/getChatMember";

const MyChats = ({}) => {
  const { setSelectedChat, selectedChat, chats, setChats, user } = useChat();
  useEffect(() => {
    const cachedChats = JSON.parse(localStorage.getItem("chats"));
    if (cachedChats?.length) {
      setChats(cachedChats);
      return;
    }
    // console.log("fetching chats");
    (async () => {
      const { data } = await fetchChats();
      setChats(data);
      localStorage.setItem("chats", JSON.stringify(data));
    })();
  }, []);
  return (
    <Box
      flex={1}
      overflowY={"auto"}
      scrollBehavior={"smooth"}
      display={"flex"}
      flexDirection={"column"}
      // rowGap={3}
      sx={{
        "&::-webkit-scrollbar": {
          width: "7px",
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        "&::-webkit-scrollbar-thumb": {
          height: "5px",
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        padding: "8px 0px ",
      }}
    >
      {chats?.map((chat, index) => {
        return (
          <Box
            key={index}
            onClick={() => setSelectedChat(chat)}
            // overflow="hidden"
            boxSizing="border-box"
            pos="relative"
            bg={selectedChat?.id === chat.id ? "green.200" : "white"}
            borderRadius={"md"}
            _hover={{
              bg: selectedChat?.id === chat.id ? "green.200" : "gray.100",
            }}
          >
            <>
              <Flex p="8px 5px">
                <Avatar
                  size={"md"}
                  bg="teal.500"
                  src={
                    chat.isGroupChat
                      ? chat.chatName
                      : getChatMember(chat.members, user.id).profilePic
                  }
                />
                <Box ml="3" flex={1} h="100%">
                  <Text noOfLines={1} color={"gray.900"}>
                    {chat.isGroupChat
                      ? chat.chatName
                      : getChatMember(chat.members, user.id).name}
                  </Text>
                  <Text fontSize="sm" noOfLines={1} color={"gray.600"}>
                    {chat.latestMessage
                      ? chat.latestMessage?.content
                      : "send your first message"}
                  </Text>
                </Box>
              </Flex>
              <Divider />
            </>
          </Box>
        );
      })}
    </Box>
  );
};

export default MyChats;
