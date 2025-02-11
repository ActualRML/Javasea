import {
  Box,
  Button,
  Text,
  Stack,
  Image,
  Divider,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const Cart = () => {
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={6}>
        Your Cart
      </Heading>
      {/* Cart Item 1 */}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        mb={4}
        bg="white"
        shadow="sm"
      >
        <Flex justify="space-between">
          <Flex>
            <Image
              src="https://via.placeholder.com/100"
              alt="Product Image"
              boxSize="100px"
              objectFit="cover"
              mr={4}
            />
            <Stack>
              <Text fontSize="xl" fontWeight="semibold">
                Product Name
              </Text>
              <Text color="gray.500">$19.99</Text>
            </Stack>
          </Flex>
          <IconButton
            aria-label="Remove from cart"
            icon={<CloseIcon />}
            variant="ghost"
            colorScheme="red"
            onClick={() => console.log("Item removed")}
          />
        </Flex>
      </Box>
      <Divider />
      {/* More cart items can go here */}

      {/* Cart Summary */}
      <Box mt={6} textAlign="right">
        <Text fontSize="xl" fontWeight="semibold">
          Total: $19.99
        </Text>
        <Button colorScheme="teal" mt={4}>
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
