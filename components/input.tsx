import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  type?: string;
  errorText?: string;
  onChangeText: (text: string) => void;
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  margin-right: 4px;
`;

const StyledInput = styled.input`
  flex: 1;
  border: 1px solid silver;
  padding: 4px;
  outline: none;
  &:focus {
    border: 1px solid gray;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 8px;
`;

export default function Input({
  label,
  value,
  type = "text",
  onChangeText,
  errorText = "",
  ...props
}: InputProps) {
  const id = Math.floor(Math.random() * 1e16).toString(16);
  return (
    <>
      <InputWrapper>
        <Label htmlFor={id}>{label}</Label>
        <StyledInput
          {...props}
          id={id}
          value={value}
          type={type}
          onChange={(e) => onChangeText(e.target.value)}
        />
      </InputWrapper>
      <ErrorText>{errorText}</ErrorText>
    </>
  );
}
