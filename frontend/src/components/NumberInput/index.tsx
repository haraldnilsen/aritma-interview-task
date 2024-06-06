import React, { ChangeEvent } from "react";

interface NumberInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  id,
  value,
  label,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    onChange(newValue);
  };

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 hover:border-gray-400 rounded-md px-3 py-2"
      />
    </>
  );
};

export default NumberInput;
