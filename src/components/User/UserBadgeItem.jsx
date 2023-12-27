import { Icon, Box, Badge, Text } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="md"
      m={1}
      mb={2}
      fontSize={12}
      bg="purple.500"
      cursor="pointer"
      color="white"
      onClick={handleFunction}
      textTransform={"capitalize"}
      fontWeight="normal"
    >
      <Box display="flex" alignItems={"center"} justifyContent={"center"}>
        {user.name}
        {/* {admin === user.id && <span> (Admin)</span>} */}
        <Icon as={AiOutlineClose} fontSize={"15px"} pl={1} />
      </Box>
    </Badge>
  );
};

export default UserBadgeItem;
