import { useEffect } from 'react';
import { RiFileUploadLine } from 'react-icons/ri';
import { useStorage } from '../hooks/useStorage';
import { useUpdateDeleteProfilePic } from '../hooks/useUpdateDeleteProfilePic';

export default function AccountChangePic({ setIsUploading, newProfileURL, setNewProfileURL }) {
  const { uploadImage } = useStorage();
  const { updateDeleteProfilePic } = useUpdateDeleteProfilePic();

  const handleProfileImageChange = (e) => {
    setIsUploading(true);
    const newImage = e.target.files;
    uploadImage(newImage, setNewProfileURL, 'profileImages');
  };

  useEffect(() => {
    if (newProfileURL) {
      updateDeleteProfilePic(newProfileURL);
      setIsUploading(false);
    }
  }, [newProfileURL]);

  return (
    <div
      aria-hidden
      className='dropzone relative flex flex-col justify-center items-center text-neutral-500 bg-white border-2 border-dashed border-gray-400 rounded w-full h-20'
    >
      <label htmlFor='fileDrop' className='absolute block w-full h-full' aria-hidden></label>
      <input
        className='absolute w-full h-full opacity-0'
        type='file'
        name='fileDrop'
        onChange={handleProfileImageChange}
        aria-label='Click or Drag to Change Profile Pic'
      />
      <RiFileUploadLine className='text-3xl text-neutral-400' />
      <span className='w-48 text-center leading-tight text-sm'>Change Profile Pic</span>
    </div>
  );
}
