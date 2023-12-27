import {
  Badge,
  Button,
  Container,
  Heading,
  Link,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import AuthInputField from "../../components/AuthInputField";
import { useState } from "react";
import { loginUser } from "../../api/userRequests";
import { ChatState } from "../../context/ChatContext";

const Auth = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoding] = useState(false);

  const navigate = useNavigate();
  const { setUser } = ChatState();

  const toast = useToast();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top right",
      });
      return;
    }
    try {
      setLoding(true);
      const { data } = await loginUser({ password, email });
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

  const loginInputFields = [
    {
      input: {
        type: "text",
        placeholder: "Enter your email address",
        name: "name",
        onChange: (e) => setEmail(e.target.value),
      },
      label: "Email",
    },
    {
      input: {
        type: "password",
        placeholder: "Enter password",
        name: "password",
        onChange: (e) => setPassword(e.target.value),
      },
      label: "Password",
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
        mt={["10%", "5%"]}
      >
        <Heading
          size={["md", "lg"]}
          noOfLines={2}
          textAlign={"center"}
          lineHeight={0}
          color={"gray.800"}
        >
          Welcome Back to{" "}
          <Badge
            variant="solid"
            fontSize={{
              md: "18px",
              lg: "24px",
            }}
            colorScheme="green"
            textTransform={"none"}
          >
            ConnectHub
          </Badge>
        </Heading>
        <Text
          fontSize={"medium"}
          textAlign={"center"}
          w={"90%"}
          color={"gray.500"}
        >
          Enter your credentials and rejoin the conversation!
        </Text>

        {loginInputFields.map((props) => {
          return <AuthInputField props={props} key={props.label} />;
        })}
        <Button
          w="100%"
          bg={"green.500"}
          textColor={"white"}
          _hover={{
            bg: "green.400",
          }}
          onClick={handleLogin}
        >
          {loading ? <Spinner /> : "Login"}
        </Button>

        <Text textAlign={"center"}>
          Don't have an account?{" "}
          <Link
            as={ReactRouterLink}
            textDecoration={"underline"}
            to="/signup"
            textColor={"orange.500"}
          >
            Signup&nbsp;Now!
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default Auth;
