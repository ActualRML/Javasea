import React from "react";
import { Box, Button, Divider, Image, Stack, Text } from "@chakra-ui/react";

const ProductDetail = () => {
  // Contoh data produk
  const product = {
    name: "Frozen Shrimp",
    description: "High-quality frozen shrimp, perfect for cooking.",
    price: 30,
    imageUrl: "https://via.placeholder.com/400", // Ganti dengan URL gambar produk
    stock: 100,
  };

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {product.name}
      </Text>

      <Stack direction={{ base: "column", md: "row" }} spacing={6}>
        {/* Gambar Produk */}
        <Box flex={1} boxSize="lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            boxSize="full"
            objectFit="cover"
            borderRadius="md"
          />
        </Box>

        {/* Detail Produk */}
        <Box flex={1}>
          <Text fontSize="lg" mb={4}>
            {product.description}
          </Text>

          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            ${product.price}
          </Text>

          <Text fontSize="md" mb={4}>
            Stock Available: {product.stock}
          </Text>

          {/* Tombol Add to Cart */}
          <Button colorScheme="teal" size="lg">
            Add to Cart
          </Button>
        </Box>
      </Stack>

      <Divider my={6} />

      {/* Section for Additional Information or Reviews */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Product Reviews
        </Text>
        {/* Tambahkan komponen review atau informasi tambahan produk di sini */}
      </Box>
    </Box>
  );
};

export default ProductDetail;
