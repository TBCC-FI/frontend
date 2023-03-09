import React from "react";
import styled from "styled-components";
import { Flex, Box, Input } from "../../../uikit";

interface CustomInputProps {
  value: number,
  onChange: (e) => void,
  onPlus: () => void,
  onMinus: () => void
}

const CustomInput: React.FC<CustomInputProps> = ({value, onChange, onPlus, onMinus}) => {
  return (
    <InputContainer>
      <DiffBtn onClick={onMinus} isDisabled={value === 0}>
        -
      </DiffBtn>
      <Line/>
      <CentralElement>
        <StyledInput
          placeholder='0'
          type='number'
          min={0}
          max={100}
          value={value}
          onChange={(e) => {
            if (value > 100) {
            onChange(100)
          } else if (value < 0) {
            onChange(0)
          } else {
            onChange(Number(e.target.value))
          }
        }}
        />
      </CentralElement>
      <Line/>
      <DiffBtn onClick={onPlus}>
        +
      </DiffBtn>
    </InputContainer>
  )
}

export default CustomInput

const InputContainer = styled(Flex)`
  width: 100%;
  height: 60px;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(16,20,40, 0.4);
  margin-top: 16px;
  margin-right: 16px;
`
const DiffBtn = styled(Flex)<{isDisabled?: boolean}>`
  height: 100%;
  width: 60px;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
  color: rgba(29, 29, 27, 0.4);
  cursor: pointer;
`
const Line = styled(Box)`
  height: 100%;
  width: 1px;
  background: linear-gradient(180deg, rgba(16,20,40, 0.0875) 0%, rgba(255, 255, 255, 0) 100%);
`
const CentralElement = styled(Flex)`
  height: 100%;
  width: calc(100% - 122px);
  align-items: center;
  justify-content: center;
`
const StyledInput = styled(Input)`
  background: transparent;
  border: none; 
  width: fit-content;
  height: fit-content;
  font-weight: 600;
  font-size: 20px;
  color: #000;
  text-align: center;
  -moz-appearance: textfield;
  
  &::placeholder {
    font-weight: 600;
    font-size: 20px;
    color: rgb(29, 29, 27);
  }
  
  &::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`
