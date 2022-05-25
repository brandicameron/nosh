import Image from 'next/image';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AccountProfilePic({
  isUploading,
  newProfileURL,
  userName,
  userProfileUrl,
}) {
  return (
    <div className='flex justify-center items-center bg-white border-2 rounded-full object-cover object-top w w-24 h-24 mx-auto -mt-14 mb-1 overflow-hidden'>
      {isUploading && <LoadingSpinner />}
      {!isUploading && (
        <Image
          src={newProfileURL || userProfileUrl}
          alt={`${userName} Profile Picture`}
          width={96}
          height={96}
          className='object-cover'
        />
      )}
    </div>
  );
}
