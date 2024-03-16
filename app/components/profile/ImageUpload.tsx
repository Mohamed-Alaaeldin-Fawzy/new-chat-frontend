import React from 'react';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa6';
import { uploadImage } from '@/helpers/uploadImage';

interface ImageUploadProps {
  isEditing: boolean;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setUserData: React.Dispatch<
    React.SetStateAction<{
      name: string | undefined;
      email: string | undefined;
      image: string | undefined;
    }>
  >;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  isEditing,
  setImage,
  image,
  setUserData,
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadResponse = await uploadImage(file);
        setImage(uploadResponse.url);
        setUserData((previousUserData) => ({
          ...previousUserData,
          image: uploadResponse.url,
        }));
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
    }
  };

  return (
    <div className="relative mb-4">
      <Image
        src={image}
        alt="profile"
        className="rounded-full"
        width={100}
        height={100}
      />

      {isEditing && (
        <>
          <input
            type="file"
            id="image-upload"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="absolute bottom-[10px] right-0 cursor-pointer rounded-full bg-blue-500 p-2 text-white"
          >
            <FaCamera size={20} />
          </label>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
