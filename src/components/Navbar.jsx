import {
  Button,
  Image,
  Flex,
  HStack,
  Spacer,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { DrawerContext } from "../context/DrawerContext";

const Navbar = () => {
  const { onOpen } = useContext(DrawerContext);
  return (
    <>
      <Flex p={"5px 10px"}>
        <HStack>
          <Image src="/logo.PNG" h={"50px"} />

          <Button
            onClick={onOpen}
            mb={2}
            display={{ base: "block", md: "none" }}
          >
            Chats
          </Button>
        </HStack>
        <Spacer />
        <HStack>
          <Avatar src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg" />
        </HStack>
      </Flex>
      <Divider />
    </>
  );
};

export default Navbar;
