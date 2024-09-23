import { IUploadImageToCloudinary } from '../utils/interfaces/services.interface';

export const uploadImageToCloudinary: IUploadImageToCloudinary = async (
  file,
  url,
  preset
) => {
  if (!file) return;

  const data = {
    file: file,
    upload_preset: preset,
  };

  try {
    const result = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    });
    const imageData = await result.json();
    return imageData.secure_url;
  } catch (e) {
    console.error('Error uploading image to Cloudinary:', e);
    return '';
  }
};
