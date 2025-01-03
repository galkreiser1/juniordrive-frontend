import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FiUser, FiLogOut } from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { endpoints } from "../../config/api";

const AvatarDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    // setLoading(true);
    try {
      console.log("Logging out");
      const response = await axios.post(
        endpoints.auth.logout,
        {},
        { withCredentials: true }
      );
      logout();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      console.error("Logout Failed:", error);
      toast({
        title: "Logout failed",
        status: "error",
        duration: 3000,
      });
    }

    //  finally {
    //   setLoading(false);
    // }
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar size="md" name={user?.name} cursor="pointer" />
      </MenuButton>
      <MenuList mt="-2" py="0">
        <MenuItem
          color="black"
          onClick={() => {
            navigate("/signup");
          }}
          icon={<Icon as={FiUser} />}
        >
          View Profile
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          icon={<Icon as={FiLogOut} />}
          color="red.500"
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarDropdown;
