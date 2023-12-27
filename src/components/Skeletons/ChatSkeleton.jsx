import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import React from "react";

const ChatSkeleton = () => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Flex bg="white" key={index} gap={2} alignItems="center">
            <SkeletonCircle size="10" />
            <Skeleton height={"30px"} flex={1} borderRadius={5} />
          </Flex>
        ))}
    </>
  );
};

export default ChatSkeleton;
