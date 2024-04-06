import React from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const ConfigurationModal = ({ isOpen, children, title, onOpenChange, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col">{title}</ModalHeader>
              <ModalBody>
                <div className="h-[70vh] overflow-y-auto">
                  {children}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
        </ModalContent>
      </Modal>
  );
};

export default ConfigurationModal;