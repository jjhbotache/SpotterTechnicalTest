import React from 'react'
import styled from 'styled-components'

interface SelectInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  className?: string
}

const SelectInput: React.FC<SelectInputProps> = ({ value, onChange, options, className }) => {
  return (
    <StyledSelect value={value} onChange={onChange} className={className}>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </StyledSelect>
  )
}

export default SelectInput

const StyledSelect = styled.select`
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
`
