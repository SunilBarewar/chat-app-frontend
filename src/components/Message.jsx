import { Box, Flex, Image, Text } from "@chakra-ui/react";

const Message = ({ text, isSent, type }) => {
  return (
    <Flex justify={isSent ? "flex-end" : "flex-start"} mb={3}>
      <Box
        p={type === "text" ? 2 : 0}
        color={isSent ? "white" : "black"}
        borderRadius="md"
        maxWidth="70%"
        fontSize={{ base: "12px", sm: "14px" }}
        bg={isSent ? "green.400" : "gray.200"}
        overflow="hidden"
      >
        {type === "text" ? (
          <Text>{text}</Text>
        ) : (
          <Image src={text} w="auto" objectFit="cover" maxH="300px" />
        )}
      </Box>
    </Flex>
  );
};

export default Message;
