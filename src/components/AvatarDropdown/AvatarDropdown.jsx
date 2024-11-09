import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { FiUser, FiLogOut } from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

const AvatarDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Menu>
      <MenuButton>
        <Avatar size="md" name={user?.name} cursor="pointer" />
      </MenuButton>
      <MenuList>
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
          onClick={logout}
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
