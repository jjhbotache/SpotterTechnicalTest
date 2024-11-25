import React from 'react'
import styled from 'styled-components'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>
  )
}

export default Modal

const ModalOverlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1em;
  border-radius: 0.5em;
  max-width: 500px;
  width: 100%;
`
