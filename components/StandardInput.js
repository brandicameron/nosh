import React from 'react';

export default function StandardInput({
  name,
  type,
  label,
  placeholder,
  value,
  handleInputChange,
}) {
  return (
    <>
      <label className='flex text-white' htmlFor={name}>
        {label}
      </label>
      <input
        className='rounded p-1.5 mb-5'
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
}
