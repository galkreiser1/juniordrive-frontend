import {
  Box,
  Stack,
  Button,
  HStack,
  Link,
  Spacer,
  IconButton,
  Flex,
  Image,
  Avatar,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import Logo from "../../assets/images/juniordrive.png";
import LoginButton from "../Login/LoginButton";

import AvatarDropdown from "../AvatarDropdown/AvatarDropdown";

const MotionIconButton = motion.create(IconButton);

const Navbar = () => {
  const { user } = useAuth();

  return (
    <Box bg="green.400" height="100px" color="white" mb={4} px={4}>
      <Flex justify={"center"} height="100%">
        <HStack width="90%" alignItems="center">
          <HStack alignItems="center">
            <NavLink to="/" style={{ position: "absolute" }}>
              <Image
                src={Logo}
                alt="JuniorDrive Logo"
                boxSize="150px"
                objectFit="contain"
                _hover={{ cursor: "pointer" }}
              />
            </NavLink>
          </HStack>

          <Spacer />

          <HStack spacing={10}>
            // In your NavLink components, replace them with this style:
            <NavLink
              to="/referal"
              style={({ isActive }) => ({
                color: "white",
                borderBottom: isActive ? "2px solid white" : "none",
                paddingBottom: "4px",
              })}
            >
              Find Referals
            </NavLink>
            <NavLink
              to="/resources"
              style={({ isActive }) => ({
                color: "white",
                borderBottom: isActive ? "2px solid white" : "none",
                paddingBottom: "4px",
              })}
            >
              Resources
            </NavLink>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: "white",
                borderBottom: isActive ? "2px solid white" : "none",
                paddingBottom: "4px",
              })}
            >
              About
            </NavLink>
          </HStack>
          <Spacer />
          <HStack spacing={10} width="100px" mr={10}>
            {!user && <LoginButton />}
            {user && <AvatarDropdown />}
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
