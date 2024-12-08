import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const About = () => {
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box bg={useColorModeValue("gray.50", "gray.800")} minH="100vh">
      <Container maxW="container.xl" py={10}>
        <VStack spacing={10}>
          {/* Hero Section */}
          <Box textAlign="center">
            <Heading size="2xl" mb={4}>
              Welcome to Junior Drive
            </Heading>
            <Text fontSize="xl" color="gray.600">
              A straightforward platform to find referrals and helpful resources
              for starting your tech career.
            </Text>
          </Box>

          {/* Features */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {/* Feature 1 */}
            <Box bg={bgColor} p={6} rounded="lg" shadow="md">
              <Heading size="md" mb={4}>
                Find Referrers
              </Heading>
              <Text color="gray.600">
                Search and connect with developers who can refer you to their
                companies. No complications, just direct connections.
              </Text>
            </Box>

            {/* Feature 2 */}
            <Box bg={bgColor} p={6} rounded="lg" shadow="md">
              <Heading size="md" mb={4}>
                Useful Resources
              </Heading>
              <Text color="gray.600">
                Access a collection of practical guides and resources to help
                with your job search and interview prep.
              </Text>
            </Box>

            {/* Feature 3 */}
            <Box bg={bgColor} p={6} rounded="lg" shadow="md">
              <Heading size="md" mb={4}>
                Offer Referrals
              </Heading>
              <Text color="gray.600">
                Already working in tech? Help other junior developers by
                offering referrals at your company.
              </Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default About;
