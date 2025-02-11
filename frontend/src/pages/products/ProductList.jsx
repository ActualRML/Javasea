import {
  Box,
  Button,
  Image,
  Text,
  Stack,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

const ProductList = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={6}>
        Products
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {/* Product 1 */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          bg="white"
          shadow="sm"
        >
          <Image
            src="https://via.placeholder.com/300"
            alt="Product Image"
            width="100%"
            height="200px"
            objectFit="cover"
          />
          <Stack p={4}>
            <Text fontSize="xl" fontWeight="semibold" lineHeight="short">
              Product Name
            </Text>
            <Text color="gray.500">$19.99</Text>
            <Button colorScheme="teal" width="100%" mt={4}>
              Add to Cart
            </Button>
          </Stack>
        </Box>
        {/* Repeat for more products */}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
