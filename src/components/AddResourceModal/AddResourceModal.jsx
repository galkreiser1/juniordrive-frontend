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
} from "@chakra-ui/react";

const AddResourceModal = ({ onAdd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Add Resource
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Resource</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Resource name" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select placeholder="Select category">
                    <option value="PLATFORM">Platform</option>
                    <option value="COMMUNITY">Community</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Link</FormLabel>
                  <Input placeholder="https://" type="url" />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder="Describe the resource..." />
                </FormControl>

                <Button type="submit" colorScheme="blue" width="full">
                  Add Resource
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddResourceModal;
