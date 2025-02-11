import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";

const Checkout = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = () => {
    alert("Order placed!");
  };

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Checkout
      </Text>

      <Stack spacing={4} direction={{ base: "column", md: "row" }}>
        {/* Form untuk Alamat Pengiriman */}
        <Box flex={1}>
          <FormControl id="name" isRequired>
            <FormLabel>Your Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </FormControl>

          <FormControl id="address" isRequired mt={4}>
            <FormLabel>Shipping Address</FormLabel>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your shipping address"
            />
          </FormControl>

          <FormControl id="paymentMethod" isRequired mt={4}>
            <FormLabel>Payment Method</FormLabel>
            <Input
              type="text"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              placeholder="Enter your payment method"
            />
          </FormControl>
        </Box>

        {/* Ringkasan Pesanan */}
        <Box flex={1} bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Order Summary
          </Text>

          {/* Produk di Cart */}
          <Box mb={4}>
            <Text>Product Name - Quantity: 1 - $20</Text>
            <Divider my={2} />
            <Text>Product Name - Quantity: 2 - $40</Text>
          </Box>

          <Text fontSize="lg" fontWeight="bold">
            Total: $60
          </Text>
        </Box>
      </Stack>

      {/* Tombol Submit */}
      <Button
        colorScheme="teal"
        size="lg"
        mt={6}
        onClick={handleSubmit}
        isDisabled={!name || !address || !paymentMethod}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default Checkout;
