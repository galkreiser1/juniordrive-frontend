import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Badge,
  Link,
  Box,
  Button,
  Flex,
  Spinner,
  VStack,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import Filter from "../shared/Filter/Filter";

import { ArrowBackIcon } from "@chakra-ui/icons";

import "./table.css";

import axios from "axios";

import capitalizeCompanyName from "../../utils/utils";

import { EmailIcon } from "@chakra-ui/icons";
import { FaLinkedin } from "react-icons/fa";

const UserTable = (props) => {
  const [referers, setReferers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (company) => {
      const response = await axios.get(
        "http://localhost:5000/api/referers/" + company
      );
      setReferers(response.data);
    };
    fetchData(props.selectedCompany);
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Spinner size="xl" />}

      {!loading && (
        <Flex justifyContent="center">
          <Box width="80%">
            <Flex justifyContent="flex-start" mb={10}>
              <Button
                onClick={props.hideTableHandler}
                leftIcon={<ArrowBackIcon />}
              >
                Back to Search
              </Button>
            </Flex>

            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>COMPANY NAME</Th>
                    <Th>Referer Name</Th>
                    <Th>Role</Th>
                    <Th>Email</Th>
                    <Th>Linkedin</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {referers && referers.length > 0 ? (
                    referers.map((row, index) => (
                      <Tr key={index}>
                        <Td>{capitalizeCompanyName(row.company)}</Td>
                        <Td>{capitalizeCompanyName(row.name || "")}</Td>
                        <Td>{row.role}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <Icon as={EmailIcon} color="gray.500" />
                            <Link
                              href={`mailto:${row.email}`}
                              color="blue.500"
                              _hover={{
                                color: "blue.600",
                                textDecoration: "none",
                              }}
                            >
                              {row.email}
                            </Link>
                          </HStack>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Icon as={FaLinkedin} color="blue.500" />
                            <Link
                              href={row.linkedin}
                              isExternal
                              color="blue.500"
                              _hover={{
                                color: "blue.600",
                                textDecoration: "none",
                              }}
                            >
                              View Profile
                            </Link>
                          </HStack>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={6} textAlign="center">
                        No results found
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

export default UserTable;
