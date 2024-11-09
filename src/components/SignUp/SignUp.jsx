import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";

import axios from "axios";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:5000/api/referers",
        data
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign Up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to help refer new juniors
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack
            as="form"
            spacing={4}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <HStack>
              <Box>
                <FormControl id="firstName" isInvalid={errors.firstName}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstName && (
                    <Text color="red.500" fontSize="sm">
                      {errors.firstName.message}
                    </Text>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isInvalid={errors.lastName}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastName && (
                    <Text color="red.500" fontSize="sm">
                      {errors.lastName.message}
                    </Text>
                  )}
                </FormControl>
              </Box>
            </HStack>

            <FormControl id="company" isInvalid={errors.company}>
              <FormLabel>Company</FormLabel>
              <Input
                type="text"
                {...register("company", { required: "Company is required" })}
              />
              {errors.company && (
                <Text color="red.500" fontSize="sm">
                  {errors.company.message}
                </Text>
              )}
            </FormControl>

            <FormControl id="role" isInvalid={errors.role}>
              <FormLabel>Role</FormLabel>
              <Input
                type="text"
                {...register("role", { required: "Role is required" })}
              />
              {errors.role && (
                <Text color="red.500" fontSize="sm">
                  {errors.role.message}
                </Text>
              )}
            </FormControl>

            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm">
                  {errors.email.message}
                </Text>
              )}
            </FormControl>

            {/* <FormControl id="linkedin" isInvalid={errors.linkedin}>
              <FormLabel>LinkedIn</FormLabel>
              <Input
                type="url"
                {...register("linkedin", {
                  required: "LinkedIn URL is required",
                  pattern: {
                    value: /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
                    message: "Invalid LinkedIn URL",
                  },
                })}
              />
              {errors.linkedin && (
                <Text color="red.500" fontSize="sm">
                  {errors.linkedin.message}
                </Text>
              )}
            </FormControl> */}

            <FormControl id="linkedin" isInvalid={errors.linkedin}>
              <FormLabel>Linkedin</FormLabel>
              <Input
                type="text"
                placeholder="LinkedIn Profile URL"
                {...register("linkedin", {
                  pattern: {
                    value:
                      /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_]+\/?$/,
                    message: "Please enter a valid LinkedIn URL",
                  },
                  validate: (value) =>
                    !value ||
                    /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_\-]+\/?$/.test(
                      value
                    ),
                })}
              />
              <FormErrorMessage>
                {errors.linkedin && errors.linkedin.message}
              </FormErrorMessage>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
