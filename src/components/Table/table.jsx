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
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import Filter from "../shared/Filter/Filter";

import { ArrowBackIcon } from "@chakra-ui/icons";

import "./table.css";

import axios from "axios";

import capitalizeCompanyName from "../../utils/utils";

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
                    <Th>Contact Info</Th>
                    <Th>Location</Th>
                    <Th>Availability</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {referers && referers.length > 0 ? (
                    referers.map((row, index) => (
                      <Tr key={index}>
                        <Td>{capitalizeCompanyName(row.company)}</Td>
                        <Td display="flex" gap={4}>
                          {capitalizeCompanyName(row.name || "")}(
                          <Badge mr={-3} ml={-3}>
                            {row.numReferrals}
                          </Badge>
                          )
                        </Td>
                        <Td>{row.role}</Td>
                        <Td>
                          {row.availability === "Available" ? (
                            <Box mb={1}>
                              <Link href={row.email} isExternal>
                                Email
                              </Link>
                              {row.linkedin && (
                                <Link href={row.linkedin} isExternal>
                                  Linkedin
                                </Link>
                              )}
                            </Box>
                          ) : (
                            <span>-</span>
                          )}
                        </Td>
                        <Td>{row.location || "-"}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              row.availability === "Available" ? "green" : "red"
                            }
                          >
                            {row.availability}
                          </Badge>
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
