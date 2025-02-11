import { Box, Flex, Heading, Link, Spacer, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" padding="4" color="white">
      <Flex align="center">
        <Heading size="lg">Java Sea Marketplace</Heading>
        <Spacer />
        <Link
          as={RouterLink}
          to="/"
          marginX="4"
          fontSize="lg"
          _hover={{ textDecoration: "underline" }}
        >
          Home
        </Link>
        <Link
          as={RouterLink}
          to="/products"
          marginX="4"
          fontSize="lg"
          _hover={{ textDecoration: "underline" }}
        >
          Products
        </Link>
        <Link
          as={RouterLink}
          to="/cart"
          marginX="4"
          fontSize="lg"
          _hover={{ textDecoration: "underline" }}
        >
          Cart
        </Link>
        <Link
          as={RouterLink}
          to="/login"
          marginX="4"
          fontSize="lg"
          _hover={{ textDecoration: "underline" }}
        >
          Login
        </Link>
        <Button
          as={RouterLink}
          to="/register"
          marginLeft="4"
          colorScheme="teal"
          size="sm"
        >
          Register
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
