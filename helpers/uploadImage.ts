export const uploadImage = async (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ky9mbaxc'); // Replace with your actual preset name

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); // Converts the response to JSON and returns it
  } catch (error) {
    console.error('Upload failed:', error);
    throw error; // Re-throw to handle the error where the function is called
  }
};
