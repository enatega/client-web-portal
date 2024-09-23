import { ConfigurationContext } from '@/lib/context/configuration.context';
import { ToastContext } from '@/lib/context/toast.context';
import { uploadImageToCloudinary } from '@/lib/services';
import {
  IConfiguration,
  IImageUploadComponentProps,
} from '@/lib/utils/interfaces';
import Image from 'next/image';
import { Avatar } from 'primereact/avatar';
import { useCallback, useContext, useState } from 'react';
import CustomLoader from '../custom-progress-indicator';

function CustomUploadImageComponent({
  name,
  title,
  onSetImageUrl,
  showExistingImage,
  existingImageUrl,
}: IImageUploadComponentProps) {
  // Context
  const configuration: IConfiguration | undefined =
    useContext(ConfigurationContext);
  const { showToast } = useContext(ToastContext);

  // States
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState('');

  // Select Image
  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const result = filterImage(event);
      if (result) imageToBase64(result);
    },
    [name, onSetImageUrl]
  );

  // Filter Images
  const filterImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ): File | undefined => {
    const files = Array.from(event.target.files || []);
    const images = files.filter((file) =>
      file.name.match(/\.(jpg|jpeg|png|gif)$/)
    );
    return images.length ? images[0] : undefined;
  };

  // Convert to Base64
  const imageToBase64 = useCallback(
    (imgFile: File): void => {
      setIsUploading(true);

      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        if (fileReader.result) {
          setImageFile(fileReader.result as string);

          uploadImageToCloudinary(
            fileReader.result as string,
            configuration?.cloudinaryUploadUrl ?? '',
            configuration?.cloudinaryApiKey ?? ''
          )
            .then((url) => {
              onSetImageUrl(name, url);

              showToast({
                type: 'info',
                title: title,
                message: 'Image has been uploaded successfully.',
                duration: 2500,
              });
            })
            .catch(() => {
              onSetImageUrl(name, '');

              showToast({
                type: 'error',
                title: title,
                message: 'Image Upload Failed',
                duration: 2500,
              });
            })
            .finally(() => {
              setIsUploading(false);
            });
        }
      };
      fileReader.readAsDataURL(imgFile);
    },
    [name, onSetImageUrl]
  );

  // Upload

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center mt-3 p-4">
      <div className="relative w-20 h-20">
        {imageFile ? (
          <div className="relative w-full h-full">
            <Image
              className="w-full h-full rounded-full border border-gray-300"
              alt="User avatar"
              src={imageFile}
              width={80}
              height={80}
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <CustomLoader />
              </div>
            )}
          </div>
        ) : showExistingImage && existingImageUrl ? (
          <div className="relative w-full h-full">
            <Image
              className="w-full h-full rounded-full border border-gray-300"
              alt="Existing avatar"
              src={existingImageUrl}
              width={80}
              height={80}
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <CustomLoader />
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Avatar
              label="Image"
              className="w-full h-full rounded-full border border-gray-300"
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <CustomLoader />
              </div>
            )}
          </div>
        )}
      </div>

      <label
        htmlFor={`${name}-upload`}
        className="flex items-center justify-center cursor-pointer bg-green-100 hover:bg-green-200 text-green-700 font-medium text-xs py-1 px-3 rounded-full transition duration-300 ease-in-out"
      >
        <span>{title}</span>
      </label>
      <input
        className="hidden"
        id={`${name}-upload`}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
      />
    </div>
  );
}

export default CustomUploadImageComponent;
