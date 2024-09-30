'use client';
// queries

//interfaces
import { IEditDeleteInterface } from '@/lib/utils/interfaces/edit-delete.interface';

//components

//icons
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//contexts

//hooks
import { useCallback, useEffect, useRef } from 'react';

export default function EditDeletePopup<T>({
  setIsDeleting,
  setIsEditing,
  setVisible,
  setIsEditDeletePopupOpen,
  visible,
  data,
}: IEditDeleteInterface<T>) {
  //states
  //popup ref
  const popupRef = useRef<HTMLDivElement | null>(null);
  //handle edit trigger
  const handleEditTrigger = useCallback(() => {
    setIsEditing({
      bool: true,
      data: data,
    });
    setIsEditDeletePopupOpen({
      _id: '',
      bool: false,
    });
  }, []);

  //handle blur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        popupRef.current.classList.add('hidden');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsEditing, setIsDeleting, visible, setVisible]);
  return (
    <div
      ref={popupRef}
      className="absolute right-8 flex w-fit flex-col items-start justify-start gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-xl"
    >
      <button onClick={handleEditTrigger} className="flex items-center gap-x-1">
        <FontAwesomeIcon
          title="Edit"
          icon={faEdit}
          className="h-4 w-4 text-gray-600"
        />
        <span className="text-sm">Edit</span>
      </button>
      <button
        onClick={() => {
          setIsDeleting({
            bool: true,
            data: data,
          });
          setVisible(false);
          setIsEditDeletePopupOpen({
            _id: '',
            bool: false,
          });
        }}
        className="flex items-center gap-x-1"
      >
        <FontAwesomeIcon
          color="red"
          width={15}
          icon={faTrash}
          className="cursor-pointer"
        />
        <span className="text-sm">Delete</span>
      </button>
    </div>
  );
}
