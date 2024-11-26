import React from 'react'
import styled from 'styled-components'

interface NumberInputProps {
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: number
  className?: string
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, min = 0, className }) => {
  return (
    <StyledNumberInput
      type="number"
      value={value}
      onChange={onChange}
      min={min}
      className={className}
    />
  )
}

export default NumberInput

const StyledNumberInput = styled.input`
  padding: 0.5em;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBackground};
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
