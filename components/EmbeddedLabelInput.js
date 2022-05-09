export default function EmbeddedLabelInput({
  name,
  type,
  label,
  placeholder,
  value,
  handleInputChange,
}) {
  return (
    <div className='relative mr-3'>
      <label className='absolute right-0 p-1.5 bg-indigo-200 rounded-r' htmlFor={name}>
        {label}
      </label>
      <input
        className='rounded p-1.5 mb-5 max-w-[115px]'
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}
