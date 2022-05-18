import React from 'react';

export default function StandardInput({
  name,
  type,
  mode,
  label,
  placeholder,
  value,
  handleInputChange,
  boolean,
}) {
  return (
    <>
      <label className='flex text-white' htmlFor={name}>
        {label}
      </label>
      <input
        className='rounded p-1.5 mb-5'
        name={name}
        type={type}
        inputMode={mode}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        required={boolean || 'false'}
      />
    </>
  );
}
