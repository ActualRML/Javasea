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

const Register = () => {
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
          Create a New Account
        </Heading>

        {/* Email Input */}
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>

        {/* Password Input */}
        <FormControl id="password" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>

        {/* Confirm Password Input */}
        <FormControl id="confirm-password" mb={6}>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" placeholder="Confirm your password" />
        </FormControl>

        {/* Register Button */}
        <Button colorScheme="teal" width="100%" mb={4}>
          Register
        </Button>

        {/* Link to Login */}
        <Text textAlign="center">
          Already have an account?{" "}
          <Link to="/login">
            <Button variant="link" colorScheme="teal">
              Log In
            </Button>
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Register;
