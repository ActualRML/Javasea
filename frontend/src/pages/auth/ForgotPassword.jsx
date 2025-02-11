import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi pengiriman email untuk reset password
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Check your email",
        description: "We have sent a link to reset your password.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setEmail("");
    }, 2000);
  };

  return (
    <Box maxW="400px" mx="auto" p={4}>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Forgot Password
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          isLoading={loading}
          loadingText="Sending"
        >
          Send Reset Link
        </Button>
      </form>

      <Text mt={4} textAlign="center">
        Remember your password?{" "}
        <Link to="/login" style={{ color: "#3182ce" }}>
          Go back to Login
        </Link>
      </Text>
    </Box>
  );
};

export default ForgotPassword;
