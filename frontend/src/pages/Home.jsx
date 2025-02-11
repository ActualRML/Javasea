import { Box, Text, Button, Container, Heading } from "@chakra-ui/react";

const Home = () => {
  return (
    <Container maxW="container.lg" centerContent>
      <Box textAlign="center" py={10}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to Java Sea Marketplace
        </Heading>
        <Text fontSize="xl" mb={6}>
          Discover the finest frozen seafood for your kitchen. Shop now and
          enjoy our premium selection!
        </Text>
        <Button colorScheme="teal" size="lg" mb={4}>
          Start Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
