import { useState } from 'react';

export default function CopyAmountBtn({ value, content }) {
  const [textCopied, setTextCopied] = useState(false);

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(e.target.value);
    setTextCopied(true);

    setTimeout(() => {
      setTextCopied(false);
    }, 1000);
  };

  return (
    <li className='relative flex justify-center border rounded h-8 mb-2'>
      <button
        className={`px-2 border rounded min-w-[75px] bg-${textCopied ? 'green-500' : 'primary'}`}
        value={value}
        onClick={copyToClipboard}
      >
        {textCopied ? '✓' : content}
      </button>
    </li>
  );
}
