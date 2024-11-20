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

const Filter = (props) => {
  const [search, setSearch] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/company");
        setCompanies(response.data.companies);
        setFilteredCompanies(response.data.companies);
      } catch (err) {
        setError(
          "There was an issue retrieving company list. Please try again."
        );
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
    const filtered = companies.filter((company) => {
      return company.name
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase());
    });
    setFilteredCompanies(filtered);
  };

  const handleSelectCompany = (company) => {
    props.setSelectedCompany(company);
  };

  const handleGoToContacts = () => {
    props.hideTableHandler();
  };

  const handleOnClose = () => {
    setError("");
  };

  return (
    <>
      {error && (
        <Flex align={"center"} justify={"center"} mt={-10} mb={10}>
          <Alert width="auto" status="error" borderRadius="md">
            <AlertIcon />
            {error}
            <CloseButton onClick={handleOnClose} />
          </Alert>
        </Flex>
      )}
      {loading && <Spinner mt="10%" size="xl" />}
      {!loading && (
        <VStack spacing={10}>
          <Box w="75%" p={8} borderWidth={1}>
            <Heading as="h1" size="xl" textAlign="center" mb={10}>
              Find a Company Contact
            </Heading>
            <Text fontSize="lg" textAlign="center" mb={10}>
              Select a company from the list or search to view available
              contacts.
            </Text>
            <Flex align={"center"} justify={"center"}>
              <HStack spacing={20}>
                <Menu placement="bottom">
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {props.selectedCompany
                      ? props.selectedCompany
                      : "Select Company"}
                  </MenuButton>
                  <MenuList
                    maxHeight="200px" // Set the max height
                    overflowY="auto" // Enable vertical scrolling
                  >
                    <Input
                      placeholder="Search Company"
                      value={search}
                      onChange={handleSearchChange}
                      size="sm"
                    />

                    {filteredCompanies.length > 0 ? (
                      filteredCompanies.map((company, idx) => {
                        return (
                          <MenuItem
                            key={idx}
                            onClick={() => handleSelectCompany(company.name)}
                          >
                            {capitalizeCompanyName(company.name)}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem>No results found!</MenuItem>
                    )}
                  </MenuList>
                </Menu>
                <Button
                  isDisabled={!props.selectedCompany}
                  onClick={handleGoToContacts}
                  colorScheme="green"
                  borderRadius="full"
                >
                  View Company Constacts
                </Button>
              </HStack>
            </Flex>
          </Box>
        </VStack>
      )}
    </>
  );
};

export default Filter;
