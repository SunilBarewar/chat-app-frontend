import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Flex
      key={user.id}
      gap={2}
      alignItems="center"
      as="button"
      onClick={() => handleFunction(user)}
      p="12px 10px"
      bg="gray.200"
      borderRadius={"md"}
      _hover={{
        bg: "green.200",
      }}
      color="gray.800"
    >
      <Avatar src={user.profilePic} size="sm" />
      <Box textAlign="left">
        <Text fontSize="md" lineHeight={1}>
          {user.name}
        </Text>
        <Text fontSize="xs" noOfLines={1}>
          <strong>Email : </strong>
          {user.email}
        </Text>
      </Box>
    </Flex>
  );
};

export default UserListItem;
