import {
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Link,
  Badge,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import AuthInputField from "../../components/AuthInputField";
import { useChat } from "../../context/ChatContext";
import { registerUser } from "../../api/userRequests";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoding] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useChat();

  const toast = useToast();
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!password || !email || !name || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top right",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top right",
      });
      return;
    }
    try {
      setLoding(true);
      const { data } = await registerUser({ password, email, name });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoding(false);
      console.log(error);
      const errMessage = error.response.data.message
        ? error.response.data.message
        : "something went wrong";
      toast({
        title: errMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top right",
      });
    }
  };
  const signupInputFields = [
    {
      input: {
        type: "text",
        placeholder: "Enter your name",
        name: "name",
        onChange: (e) => setName(e.target.value),
      },
      label: "Full Name",
    },
    {
      input: {
        type: "text",
        placeholder: "email address",
        name: "email",
        onChange: (e) => setEmail(e.target.value),
      },
      label: "Email",
    },
    {
      input: {
        type: "password",
        placeholder: "Enter strong password",
        name: "password",
        onChange: (e) => setPassword(e.target.value),
      },
      label: "Password",
    },
    {
      input: {
        type: "password",
        placeholder: "Confirm password",
        name: "confirmPassword",
        onChange: (e) => setConfirmPassword(e.target.value),
      },
      label: "Confirm password",
    },
  ];

  return (
    <Container minW="100%" bg="gray.50" p={0} h="100vh" centerContent>
      <VStack
        w={["95%", "480px"]}
        boxShadow="md"
        bg="white"
        p={["15px", "30px"]}
        rounded="lg"
        spacing={18}
        mt={2}
      >
        <Heading
          size={["md", "lg"]}
          noOfLines={2}
          textAlign={"center"}
          lineHeight={0}
          color={"gray.800"}
          display={"flex"}
          alignItems={"center"}
        >
          Join{" "}
          <Badge
            variant="solid"
            fontSize={{
              md: "18px",
              lg: "24px",
            }}
            colorScheme="green"
            mx={"4px"}
            textTransform={"none"}
          >
            ConnectHub
          </Badge>
          Today
        </Heading>
        <Text
          fontSize={"medium"}
          textAlign={"center"}
          color={"gray.500"}
          w={"90%"}
        >
          Create your account and start connecting with friends, family, and
          beyond!
        </Text>

        {signupInputFields.map((props) => {
          return <AuthInputField props={props} key={props.label} />;
        })}

        <Button
          w="100%"
          bg={"green.500"}
          textColor={"white"}
          _hover={{
            bg: "green.400",
          }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <Text textAlign={"center"}>
          Already have an account?
          <Link
            as={ReactRouterLink}
            textDecoration={"underline"}
            to="/login"
            textColor={"orange.500"}
          >
            Login&nbsp;Now!
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default Signup;
