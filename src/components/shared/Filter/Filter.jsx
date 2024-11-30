import {
  Menu,
  MenuButton,
  MenuList,
  Input,
  Button,
  MenuItem,
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

import { useState } from "react";

import { useEffect } from "react";

import axios from "axios";

import capitalizeCompanyName from "../../../utils/utils";

import { endpoints } from "../../../config/api";

const Filter = (props) => {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchCompanies = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.get(endpoints.companies.base, {
        params: {
          search: searchTerm,
          limit: 20,
        },
      });
      setCompanies(response.data.companies);
    } catch (err) {
      setError("There was an issue retrieving company list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Using setTimeout to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        searchCompanies(search);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      {error && (
        <Flex align={"center"} justify={"center"} mt={-10} mb={10}>
          <Alert width="auto" status="error" borderRadius="md">
            <AlertIcon />
            {error}
            <CloseButton onClick={() => setError("")} />
          </Alert>
        </Flex>
      )}

      <VStack spacing={10}>
        <Box w="75%" p={8} borderWidth={1}>
          <Heading as="h1" size="xl" textAlign="center" mb={10}>
            Find a Company Contact
          </Heading>
          <Text fontSize="lg" textAlign="center" mb={10}>
            Select a company from the list or search to view available contacts.
          </Text>
          <Flex align={"center"} justify={"center"}>
            <HStack spacing={20}>
              <Menu placement="bottom">
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {props.selectedCompany
                    ? props.selectedCompany
                    : "Select Company"}
                </MenuButton>
                <MenuList maxHeight="200px" overflowY="auto">
                  <Input
                    placeholder="Search Company"
                    value={search}
                    onChange={handleSearchChange}
                    size="sm"
                    mx={2}
                    my={2}
                  />

                  {loading ? (
                    <MenuItem>
                      <Spinner size="sm" mr={2} /> Loading...
                    </MenuItem>
                  ) : companies.length > 0 ? (
                    companies.map((company) => (
                      <MenuItem
                        key={company._id}
                        onClick={() =>
                          props.setSelectedCompany(
                            capitalizeCompanyName(company.name)
                          )
                        }
                      >
                        {capitalizeCompanyName(company.name)}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem isDisabled>No results found!</MenuItem>
                  )}
                </MenuList>
              </Menu>
              <Button
                isDisabled={!props.selectedCompany}
                onClick={props.hideTableHandler}
                colorScheme="green"
                borderRadius="full"
              >
                View Company Contacts
              </Button>
            </HStack>
          </Flex>
        </Box>
      </VStack>
    </>
  );
};

export default Filter;
