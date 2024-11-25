import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  Box,
  Button,
  Flex,
  Spinner,
  HStack,
  Icon,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FaBook, FaUsers, FaFile } from "react-icons/fa";
import AddResourceModal from "../AddResourceModal/AddResourceModal";

const ResourcesTable = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "LeetCode",
        type: "PLATFORM",
        category: "Practice",
        description: "Coding practice platform with 2000+ problems",
        link: "https://leetcode.com",
      },
      {
        id: 2,
        name: "System Design Community",
        type: "COMMUNITY",
        category: "Learning",
        description:
          "Active community discussing system design patterns and practices",
        link: "https://t.me/systemdesign",
      },
      {
        id: 3,
        name: "Interview Preparation Guide",
        type: "GUIDE",
        category: "Guide",
        description: "Comprehensive guide covering DSA and system design",
        link: "/documents/guide.pdf",
      },
    ];

    setResources(mockData);
    setLoading(false);
  }, []);

  const getResourceIcon = (type) => {
    switch (type) {
      case "PLATFORM":
        return ExternalLinkIcon;
      case "COMMUNITY":
        return FaUsers;
      case "GUIDE":
        return FaFile;
      default:
        return FaBook;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "PLATFORM":
        return "blue.500";
      case "COMMUNITY":
        return "green.500";
      case "GUIDE":
        return "purple.500";
      default:
        return "gray.500";
    }
  };

  const filteredResources = resources.filter(
    (resource) => activeFilter === "ALL" || resource.type === activeFilter
  );

  return (
    <>
      {loading && <Spinner size="xl" />}

      {!loading && (
        <Flex justifyContent="center">
          <Box width="80%" shadow="sm" rounded="lg" bg="white" p={6}>
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
              <ButtonGroup size="sm" isAttached spacing="1" mx={2}>
                <Button
                  colorScheme={activeFilter === "ALL" ? "blue" : "gray"}
                  onClick={() => setActiveFilter("ALL")}
                  px={6}
                  mr="1px"
                >
                  All Resources
                </Button>
                <Button
                  colorScheme={activeFilter === "PLATFORM" ? "blue" : "gray"}
                  onClick={() => setActiveFilter("PLATFORM")}
                  px={6}
                  mr="1px"
                >
                  Platforms
                </Button>
                <Button
                  colorScheme={activeFilter === "COMMUNITY" ? "blue" : "gray"}
                  onClick={() => setActiveFilter("COMMUNITY")}
                  px={6}
                  mr="1px"
                >
                  Communities
                </Button>
                <Button
                  colorScheme={activeFilter === "GUIDE" ? "blue" : "gray"}
                  onClick={() => setActiveFilter("GUIDE")}
                  px={6}
                >
                  Guides
                </Button>
              </ButtonGroup>

              <AddResourceModal />
            </Flex>

            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th borderBottom="2px" borderColor="gray.200" width="50%">
                      RESOURCE
                    </Th>

                    <Th borderBottom="2px" borderColor="gray.200">
                      TYPE
                    </Th>
                    <Th borderBottom="2px" borderColor="gray.200">
                      ACCESS
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                      <Tr
                        key={resource.id}
                        _hover={{ bg: "gray.50" }}
                        transition="background 0.2s"
                      >
                        <Td>
                          <HStack spacing={3}>
                            <Icon
                              as={getResourceIcon(resource.type)}
                              color={getIconColor(resource.type)}
                              boxSize={5}
                            />
                            <Box>
                              <Text fontWeight="medium">{resource.name}</Text>
                              <Text
                                fontSize="sm"
                                color="gray.500"
                                noOfLines={2}
                              >
                                {resource.description}
                              </Text>
                            </Box>
                          </HStack>
                        </Td>
                        <Td>
                          <Text
                            color={getIconColor(resource.type)}
                            fontWeight="medium"
                          >
                            {resource.type.charAt(0) +
                              resource.type.slice(1).toLowerCase()}
                          </Text>
                        </Td>
                        <Td>
                          <Link
                            href={resource.link}
                            isExternal
                            color="blue.500"
                            _hover={{
                              color: "blue.600",
                              textDecoration: "none",
                            }}
                          >
                            <HStack>
                              <Text>Open</Text>
                              <ExternalLinkIcon boxSize={4} />
                            </HStack>
                          </Link>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={4} textAlign="center" py={8}>
                        <Text color="gray.500">No resources found</Text>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ResourcesTable;
