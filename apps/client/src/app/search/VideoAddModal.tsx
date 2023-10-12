import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

type VideoAddModalProps = {
  buttonText: string;
}

const VideoAddModal = ({ buttonText }: VideoAddModalProps) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ selectedShow, setSelectedShow ] = useState("");

  const closeModal = () => {
    setSelectedShow("");
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen}>{buttonText}</Button>
      <Modal isCentered onClose={closeModal} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select placeholder="Select Show" onChange={e => setSelectedShow(e.target.value)}>
              <option value="add">Add new show...</option>
            </Select>
            {selectedShow === 'add' ? (<Input mt={2} placeholder="Show title" />) : null}
          </ModalBody>
          <ModalFooter>
            <Button mr={2}>Add</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default VideoAddModal;