import { useState, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStorage } from '../hooks/useStorage';
import { RiFileUploadLine } from 'react-icons/ri';

export default function FeatureImageInput({ setFeatureImgURL }) {
  const [files, setFiles] = useState([]);
  const { uploadImage } = useStorage();

  const acceptStyle = {
    backgroundColor: '#d6fdd6',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign({
            preview: URL.createObjectURL(file),
          })
        )
      );
      uploadImage(acceptedFiles, setFeatureImgURL, 'featureImages');
    },
  });

  const style = useMemo(
    () => ({
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragAccept, isDragReject]
  );

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <label className='text-white' htmlFor='featureImg'>
        Feature Image
      </label>
      <div
        {...getRootProps({
          style,
        })}
        className='flex justify-around items-center text-neutral-500 bg-white border-2 border-dashed border-gray-400 p-5 rounded mb-4'
      >
        <div className='flex flex-col justify-center items-center'>
          <input {...getInputProps()} />
          <RiFileUploadLine className='text-3xl text-neutral-400' />
          <p>Drag and drop, or click to select files</p>
        </div>
        {files[0] !== undefined && (
          <img
            width={96}
            height={64}
            src={files[0].preview}
            alt=''
            onLoad={() => {
              URL.revokeObjectURL(files[0].preview);
            }}
            className='rounded w-24 h-16 object-cover'
          />
        )}
      </div>
    </>
  );
}
