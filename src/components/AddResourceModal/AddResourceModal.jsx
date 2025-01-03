import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
  FormErrorMessage,
  RadioGroup,
  Radio,
  Stack,
  FormHelperText,
  Tooltip,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { endpoints } from "../../config/api";
import { useResources } from "../../context/ResourceContext";
import { useAuth } from "../../context/AuthContext";

const ResourceSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  type: Yup.string()
    .oneOf(["PLATFORM", "COMMUNITY", "GUIDE"], "Invalid type")
    .required("Type is required"),
  link: Yup.string().when(["type", "guideType"], {
    is: (type, guideType) =>
      type !== "GUIDE" || (type === "GUIDE" && guideType === "link"),
    then: () =>
      Yup.string().url("Must be a valid URL").required("Link is required"),
    otherwise: () => Yup.string(),
  }),
  description: Yup.string().max(500, "Description too long"),
  file: Yup.mixed().when(["type", "guideType"], {
    is: (type, guideType) => type === "GUIDE" && guideType === "file",
    then: () => Yup.mixed().required("File is required"),
    otherwise: () => Yup.mixed().nullable(),
  }),
});

const AddResourceModal = ({ onAdd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { addResource } = useResources();
  const { user } = useAuth();

  const handleSubmit = async (values, actions) => {
    try {
      let response;

      // If it's a GUIDE with a file upload
      if (values.type === "GUIDE" && values.file) {
        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("name", values.name);
        formData.append("type", values.type);
        formData.append("description", values.description);

        response = await axios.post(endpoints.resources.withFile, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
      } else {
        // Regular resource (no file)
        response = await axios.post(
          endpoints.resources.base,
          {
            name: values.name,
            type: values.type,
            description: values.description,
            link: values.link,
          },
          { withCredentials: true }
        );
      }

      addResource(response.data.resource);

      toast({
        title: "Resource added",
        description: "The resource has been successfully added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      actions.resetForm();
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to add resource. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    actions.setSubmitting(false);
  };

  return (
    <>
      <Tooltip label="Sign in to add resources" isDisabled={user}>
        <Button colorScheme="blue" onClick={onOpen} isDisabled={!user}>
          Add Resource
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Resource</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                name: "",
                type: "",
                link: "",
                description: "",
                file: null,
                guideType: "link",
              }}
              validationSchema={ResourceSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form>
                  <VStack spacing={4}>
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>Name</FormLabel>
                          <Input {...field} placeholder="Resource name" />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="type">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.type && form.touched.type}
                        >
                          <FormLabel>Type</FormLabel>
                          <Select
                            {...field}
                            placeholder="Select type"
                            onChange={(e) => {
                              if (e.target.value !== "GUIDE") {
                                setFieldValue("guideType", "link");
                              }
                              field.onChange(e);
                            }}
                          >
                            <option value="PLATFORM">Platform</option>
                            <option value="COMMUNITY">Community</option>
                            <option value="GUIDE">Guide</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.type}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    {values.type === "GUIDE" && (
                      <FormControl>
                        <FormLabel>Guide Type</FormLabel>
                        <RadioGroup
                          value={values.guideType}
                          onChange={(value) => {
                            setFieldValue("guideType", value);
                            if (value === "link") {
                              setFieldValue("file", null);
                            } else {
                              setFieldValue("link", "");
                            }
                          }}
                        >
                          <Stack direction="row">
                            <Radio value="link">External Link</Radio>
                            <Radio value="file">File Upload</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    )}

                    {(values.type !== "GUIDE" ||
                      (values.type === "GUIDE" &&
                        values.guideType === "link")) && (
                      <Field name="link">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.link && form.touched.link}
                          >
                            <FormLabel>Link</FormLabel>
                            <Input
                              {...field}
                              placeholder="https://"
                              type="url"
                            />
                            <FormErrorMessage>
                              {form.errors.link}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    )}

                    {values.type === "GUIDE" && values.guideType === "file" && (
                      <Field name="file">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.file && form.touched.file}
                          >
                            <FormLabel>Upload Guide</FormLabel>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(event) => {
                                setFieldValue(
                                  "file",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                            <FormHelperText>
                              Accepted formats: PDF, DOC, DOCX
                            </FormHelperText>
                            <FormErrorMessage>
                              {form.errors.file}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    )}

                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.description && form.touched.description
                          }
                        >
                          <FormLabel>Description</FormLabel>
                          <Textarea
                            {...field}
                            placeholder="Describe the resource..."
                          />
                          <FormErrorMessage>
                            {form.errors.description}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      width="full"
                      isLoading={isSubmitting}
                    >
                      Add Resource
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddResourceModal;
