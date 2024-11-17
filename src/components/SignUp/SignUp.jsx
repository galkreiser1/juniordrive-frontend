"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  FormHelperText,
  SimpleGrid,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useAuth } from "../../context/AuthContext";

import axios from "axios";

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last name is required"),
  linkedin: Yup.string()
    .url("Must be a valid URL")
    .matches(
      /^https?:\/\/(www\.)?linkedin\.com\/in\/.*$/,
      "Must be a valid LinkedIn profile URL"
    )
    .nullable(),
  company: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Company name is required"),
  role: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Role is required"),
});

export default function SignUp() {
  const toast = useToast();
  const { user } = useAuth();
  console.log(user);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/referers",
        data
      );
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }} mb={6}>
          Profile Settings
        </Heading>

        <Formik
          initialValues={{
            name: user?.name || "name",
            linkedin: "",
            company: "",
            role: "",
            email: user?.email,
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {
            <Form>
              <Stack spacing={4} mt={10}>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel>Full Name</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder={user?.email}
                    isReadOnly
                    bg={useColorModeValue("gray.100", "gray.600")}
                    type="email"
                  />
                </FormControl>

                <Field name="linkedin">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.linkedin && form.touched.linkedin}
                    >
                      <FormLabel>LinkedIn Profile</FormLabel>
                      <Input
                        {...field}
                        placeholder="https://linkedin.com/in/your-profile"
                      />
                      <FormHelperText>
                        Optional: Add your LinkedIn profile URL
                      </FormHelperText>
                      <FormErrorMessage>
                        {form.errors.linkedin}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="company">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.company && form.touched.company}
                    >
                      <FormLabel>Company</FormLabel>
                      <Input {...field} placeholder="Current Company" />
                      <FormErrorMessage>{form.errors.company}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="role">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.role && form.touched.role}
                    >
                      <FormLabel>Role</FormLabel>
                      <Input {...field} placeholder="Your Role/Position" />
                      <FormErrorMessage>{form.errors.role}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    onClick={() => {}}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    w="full"
                    type="submit"
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Form>
          }
        </Formik>
      </Stack>
    </Flex>
  );
}
