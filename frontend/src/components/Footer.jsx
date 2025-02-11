import { Box, Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="teal.500" color="white" padding="4" marginTop="auto">
      <Flex justify="center">
        <Text>
          &copy; {new Date().getFullYear()} Java Sea Marketplace. All Rights
          Reserved.
        </Text>
        <Link href="https://www.privacypolicy.com" isExternal marginLeft="4">
          Privacy Policy
        </Link>
        <Link
          href="https://www.termsandconditions.com"
          isExternal
          marginLeft="4"
        >
          Terms & Conditions
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
