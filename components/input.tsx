import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  type?: string;
  errorText?: string;
  onChangeText: (text: string) => void;
}

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
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        {...props}
        id={id}
        value={value}
        type={type}
        onChange={(e) => onChangeText(e.target.value)}
      />
      <div>{errorText}</div>
    </div>
  );
}
