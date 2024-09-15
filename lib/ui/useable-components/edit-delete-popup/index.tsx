import IEditDeleteInterface from '@/lib/utils/interfaces/edit-delete.interface';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';

export default function EditDeletePopup<T extends { _id: string }>({
  setIsEditing,
  setIsDeleting,
  setIsEditDeletePopupOpen,
  data,
}: IEditDeleteInterface<T>) {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsDeleting({
          _id: '',
          bool: false,
        });
        setIsEditDeletePopupOpen({
          bool: false,
          _id: '',
        });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsEditing, setIsDeleting, setIsEditDeletePopupOpen]);

  return (
    <div
      ref={popupRef}
      className="flex flex-col gap-2 p-3 rounded-lg right-0 bg-white shadow-xl border-gray-400 border w-8 sticky h-16 items-center justify-center"
    >
      <FontAwesomeIcon
        color="blue"
        icon={faEdit}
        width={15}
        onClick={() => {
          setIsEditing({
            bool: true,
            data: data,
          });
          setIsEditDeletePopupOpen({
            _id: '',
            bool: false,
          });
        }}
        className="cursor-pointer"
      />
      <FontAwesomeIcon
        color="red"
        width={15}
        icon={faTrash}
        onClick={() => {
          setIsDeleting({
            _id: data?._id,
            bool: true,
          });
          setIsEditDeletePopupOpen({
            _id: '',
            bool: false,
          });
        }}
        className="cursor-pointer"
      />
    </div>
  );
}
