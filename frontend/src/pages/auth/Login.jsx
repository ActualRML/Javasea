import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container maxW="sm" centerContent>
      <Box
        boxShadow="lg"
        p={6}
        rounded="md"
        w="100%"
        bg="white"
        border="1px"
        borderColor="gray.200"
      >
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          Login to Your Account
        </Heading>

        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>

        <FormControl id="password" mb={6}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>

        <Button colorScheme="teal" width="100%" mb={4}>
          Log In
        </Button>

        <Text textAlign="center">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#3182ce" }}>
            Sign Up
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Login;
