import React from "react";
import { Box, Container, Link, HStack, Text } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="green.400" color="white" py={4} mt="auto">
      <Container maxW="container.xl">
        <HStack justify="center" spacing={6} align="center">
          <Text>Created by Gal Kreiser</Text>
          <Link
            href="https://github.com/galkreiser1"
            isExternal
            _hover={{ opacity: 0.8 }}
          >
            <FaGithub size={24} />
          </Link>
          <Link
            href="https://linkedin.com/in/gal-kreiser"
            isExternal
            _hover={{ opacity: 0.8 }}
          >
            <FaLinkedin size={24} />
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
