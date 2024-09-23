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
      className="flex flex-col gap-2 p-2 rounded-lg right-8  bg-white shadow-xl border border-gray-200 w-fit items-start justify-start absolute"
    >
      <button onClick={handleEditTrigger} className="flex gap-x-1 items-center">
        <FontAwesomeIcon
          title="Edit"
          icon={faEdit}
          className="w-4 h-4 text-gray-600"
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
        className="flex gap-x-1 items-center"
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
