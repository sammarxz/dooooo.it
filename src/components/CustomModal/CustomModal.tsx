import {
  Modal,
  ModalBody as ChakraModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter as ChakraModalFooter,
  ModalHeader as ChakraModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import React from 'react'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function ModalHeader({ children }: { children: React.ReactNode }) {
  return <ChakraModalHeader>{children}</ChakraModalHeader>
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return <ChakraModalFooter>{children}</ChakraModalFooter>
}

function ModalBody({ children }: { children: React.ReactNode }) {
  return <ChakraModalBody>{children}</ChakraModalBody>
}

function CustomModal({ isOpen, onClose, children }: CustomModalProps) {
  const modalHeader = React.Children.toArray(children).find((child) => {
    return (child as React.ReactElement).type === ModalHeader
  })

  const modalFooter = React.Children.toArray(children).find((child) => {
    return (child as React.ReactElement).type === ModalFooter
  })

  const modalBody = React.Children.toArray(children).find((child) => {
    return (child as React.ReactElement).type === ModalBody
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {modalHeader}
        <ModalCloseButton />
        {React.Children.toArray(children).filter((child) => {
          return (
            (child as React.ReactElement).type !== ModalHeader &&
            (child as React.ReactElement).type !== ModalFooter &&
            (child as React.ReactElement).type !== ModalBody
          )
        })}
        {modalBody}
        {modalFooter}
      </ModalContent>
    </Modal>
  )
}

CustomModal.Header = ModalHeader
CustomModal.Footer = ModalFooter
CustomModal.Body = ModalBody

export { CustomModal }
