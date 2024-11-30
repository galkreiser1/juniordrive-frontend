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
  Divider,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useAuth } from "../../context/AuthContext";

import axios from "axios";
import { useState, useEffect } from "react";

import capitalizeCompanyName from "../../utils/utils";

import { endpoints } from "../../config/api";

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required"),
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [referer, setReferer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          endpoints.referers.byEmail(user?.email)
        );
        setReferer(response.data.referer);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    console.log("referer: ", referer);
  }, [referer]);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(endpoints.referers.base, values);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRemoveReferral = async () => {
    try {
      await axios.delete(endpoints.referers.delete(user?.email));
      toast({
        title: "Referral removed",
        description: "Your referral profile has been successfully removed",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to remove referral. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading || !user?.name || !user?.email) {
    return <div>Loading...</div>;
  }

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
            name: user?.name || "",
            linkedin: referer?.linkedin || "",
            company: capitalizeCompanyName(referer?.company) || "",
            role: referer?.role || "",
            email: user?.email || "",
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

        <Divider my={8} />

        {referer && (
          <Stack spacing={4}>
            <Heading
              size="md"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              Remove Referral Profile
            </Heading>
            <Text color={useColorModeValue("gray.600", "gray.400")}>
              Remove your profile from the referrers list. This action cannot be
              undone.
            </Text>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={onOpen}
              size="lg"
            >
              Remove Referral Profile
            </Button>
          </Stack>
        )}

        <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Remove Referral Profile
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? This will remove your profile from the referrers
                list. This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button colorScheme="red" onClick={handleRemoveReferral} ml={3}>
                  Remove
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Stack>
    </Flex>
  );
}
