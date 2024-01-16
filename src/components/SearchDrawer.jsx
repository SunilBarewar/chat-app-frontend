import {
  Box,
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdSearch } from "react-icons/md";
import UserListItem from "./User/UserListItem";
import ChatSkeleton from "./Skeletons/ChatSkeleton";
import useFetchUsers from "../hooks/useFetchUsers";
import { createOneOnOneChat } from "../api/chatRequests";
import { useChat } from "../context/ChatContext";

const SearchDrawer = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const inputRef = useRef();
  const { setSearchQuery, searchResult, loading } = useFetchUsers();
  const toast = useToast();
  const { chats, setChats, setSelectedChat } = useChat();
  const accessChat = async (selectedUser) => {
    try {
      const { data } = await createOneOnOneChat({ userId: selectedUser.id });
      console.log(data);
      if (!chats.some((obj) => obj.id === data.id)) {
        setChats((prev) => [data, ...prev]);
        // localStorage.setItem("chats", JSON.stringify([data, ...chats]));
      }
      setSelectedChat(data);
      onClose();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to open chat",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top right",
      });
    }
  };
  return (
    <>
      {<span onClick={onOpen}>{children}</span>}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        closeOnOverlayClick={false}
        initialFocusRef={inputRef}
      >
        {/* maxW={["500px"]} */}
        <DrawerContent>
          <DrawerBody>
            <Box
              w="100%"
              display={"flex"}
              flexDir={"column"}
              overflow={"hidden"}
            >
              <Flex justifyContent={"space-between"}>
                <Heading size="md" color={"gray.600"}>
                  Search users & start chatting with them{" "}
                </Heading>
                <CloseButton onClick={onClose} />
              </Flex>

              <Box mt="1rem">
                <InputGroup>
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search chats"
                    focusBorderColor="green.50"
                    outline="none"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <InputRightElement>
                    <Icon
                      as={MdSearch}
                      fontSize={"22px"}
                      color="gray.900"
                      m={"auto"}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>

              <Flex
                maxH="400px"
                overflowY="auto"
                w="100%"
                mt="1rem"
                flexDir="column"
                gap="10px"
                sx={{
                  "&::-webkit-scrollbar": {
                    width: 0,
                  },
                }}
              >
                {loading ? (
                  <ChatSkeleton />
                ) : (
                  searchResult?.map((user) => {
                    return (
                      <UserListItem
                        key={user.id}
                        user={user}
                        handleFunction={accessChat}
                      />
                    );
                  })
                )}
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
