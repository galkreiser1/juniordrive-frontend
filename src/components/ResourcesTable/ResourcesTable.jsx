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
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { FaBook, FaUsers, FaFile } from "react-icons/fa";
import AddResourceModal from "../AddResourceModal/AddResourceModal";
import axios from "axios";
import { FiDownload } from "react-icons/fi";
import { endpoints } from "../../config/api";
import { useResources } from "../../context/ResourceContext";

const ResourcesTable = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const { resources, loading, error, fetchResources } = useResources();

  useEffect(() => {
    fetchResources();
  }, []);

  const handleAddResource = (newResource) => {
    setResources((prevResources) => [...prevResources, newResource]);
  };

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

  const filteredResources = resources.filter((resource) => {
    const filterMatch =
      activeFilter === "ALL" || resource.type === activeFilter;
    const searchMatch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return filterMatch && searchMatch;
  });

  return (
    <>
      {loading && <Spinner size="xl" />}

      {error && (
        <Flex justifyContent="center" m={4}>
          <Text color="red.500">{error}</Text>
        </Flex>
      )}

      {!loading && !error && (
        <Flex justifyContent="center">
          <Box width="80%" shadow="sm" rounded="lg" bg="white" p={6}>
            {/* Tabs/Filter Buttons first */}
            <ButtonGroup size="sm" isAttached spacing="1" mb={6}>
              <Button
                colorScheme={activeFilter === "ALL" ? "blue" : "gray"}
                onClick={() => setActiveFilter("ALL")}
                px={6}
              >
                All Resources
              </Button>
              <Button
                colorScheme={activeFilter === "PLATFORM" ? "blue" : "gray"}
                onClick={() => setActiveFilter("PLATFORM")}
                px={6}
              >
                Platforms
              </Button>
              <Button
                colorScheme={activeFilter === "COMMUNITY" ? "blue" : "gray"}
                onClick={() => setActiveFilter("COMMUNITY")}
                px={6}
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

            {/* Search and Add Resource on same line */}
            <Flex justify="space-between" align="center" mb={6}>
              <InputGroup maxW="500px">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
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
                          {resource.fileUrl ? (
                            <HStack spacing={2}>
                              <Link
                                href={resource.fileUrl}
                                isExternal
                                target="_blank"
                                color="blue.500"
                                _hover={{
                                  color: "blue.600",
                                  textDecoration: "none",
                                }}
                              >
                                <HStack>
                                  <Text>View</Text>
                                  <ExternalLinkIcon boxSize={4} />
                                </HStack>
                              </Link>
                            </HStack>
                          ) : (
                            // For regular links - keep as is
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
                          )}
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
