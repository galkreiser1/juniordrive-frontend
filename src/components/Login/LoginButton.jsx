import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button, useToast, Box } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { endpoints } from "../../config/api";

const LoginButton = () => {
  const [loading, setLoading] = useState(false);
  const { user, login, logout } = useAuth();
  const toast = useToast();

  const handleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const response = await axios.post(
        endpoints.auth.login,
        {
          token: credentialResponse.credential,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        login(response.data.user);
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Login Failed:", error);
      toast({
        title: "Login failed",
        description: "Please try again",
        status: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          toast({
            title: "Login failed",
            status: "error",
            duration: 3000,
          });
        }}
        size="large"
        theme="filled_blue"
        render={(renderProps) => (
          <Button
            {...renderProps}
            colorScheme="blue"
            isLoading={loading}
            loadingText="Signing in"
            variant="solid"
            size="lg"
            leftIcon={<i className="fab fa-google"></i>}
            onClick={renderProps.onClick}
            borderRadius="full"
          >
            Login with Google
          </Button>
        )}
      />
    </>
  );
};

export default LoginButton;
