import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Flex,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import useFetchUsers from "../../hooks/useFetchUsers";
import ChatSkeleton from "../Skeletons/ChatSkeleton";
import UserListItem from "../User/UserListItem";
import UserBadgeItem from "../User/UserBadgeItem";
import { ChatState } from "../../context/ChatContext";
import { createGroupChat, fetchChats } from "../../api/chatRequests";

const GroupModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const groupNameRef = useRef();
  const { user, setChats } = ChatState();
  const { setSearchQuery, searchResult, loading } = useFetchUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const toast = useToast();
  const handleSelectUsers = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleCreateGroup = async () => {
    if (selectedUsers.length < 2) {
      toast({
        title: "Select at least 2 users",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      await createGroupChat({
        groupName,
        groupMembers: [{ id: user?.id }, ...selectedUsers],
      });
      toast({
        title: "group created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      const { data } = await fetchChats();
      setChats(data);
    } catch (error) {
      toast({
        title: "error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }

    onClose();
  };
  return (
    <>
      {<span onClick={onOpen}>{children}</span>}
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={groupNameRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap="10px">
              <Input
                ref={groupNameRef}
                type="text"
                placeholder="group name"
                focusBorderColor="green.100"
                outline="none"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <FormControl>
                <Input
                  type="text"
                  placeholder="search users"
                  focusBorderColor="green.100"
                  outline="none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </FormControl>
              {/* Selected users */}
              <Flex
                flexWrap="wrap"
                gap="5px"
                maxH="100px"
                overflowY="auto"
                w="100%"
                sx={{
                  "&::-webkit-scrollbar": {
                    width: 0,
                  },
                }}
              >
                {selectedUsers?.map((user) => (
                  <UserBadgeItem
                    user={user}
                    key={user.id}
                    handleFunction={() => {}}
                  />
                ))}
              </Flex>
              <Flex
                maxH="200px"
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
                  searchResult?.slice(0, 5).map((user) => {
                    return (
                      <UserListItem
                        key={user.id}
                        user={user}
                        handleFunction={handleSelectUsers}
                      />
                    );
                  })
                )}
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleCreateGroup}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModal;
