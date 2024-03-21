import React, { useState } from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa6';
import { uploadImage } from '@/helpers/uploadImage';
import { BiLoaderAlt } from 'react-icons/bi';
import { updateUser } from '@/action/updateUser';
import { useAuth } from '@/context/AuthContext';

interface ImageUploadProps {
  setImage: (image: string) => void;
  image: string;
  setUserData: React.Dispatch<
    React.SetStateAction<{
      name: string | undefined;
      email: string | undefined;
      image: string;
    }>
  >;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  setImage,
  image,
  setUserData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsLoading(true);
    setError('');

    try {
      const uploadResponse = await uploadImage(file);
      const newImageUrl = `${uploadResponse.url}?${new Date().getTime()}`;
      setImage(newImageUrl);
      setUserData((prev) => ({ ...prev, image: newImageUrl }));
      const updatedUser = await updateUser({ image: newImageUrl });
      setUser(updatedUser);
    } catch (error: any) {
      setError('Failed to upload image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative m-4">
      {isLoading ? (
        <div className="flex h-[200px] w-[200px] items-center justify-center rounded-full border-[1px] border-gray-200">
          <BiLoaderAlt size={30} className="animate-spin" />
        </div>
      ) : (
        <Image
          src={image}
          alt="profile"
          className="rounded-full"
          width={200}
          height={200}
        />
      )}
      <div>
        <input
          type="file"
          id="image-upload"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="image-upload"
          className="absolute bottom-[10px] right-0 cursor-pointer rounded-full bg-gray-500 p-4 text-white"
        >
          <FaCamera size={25} />
        </label>
      </div>
      {!!error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default ImageUpload;
