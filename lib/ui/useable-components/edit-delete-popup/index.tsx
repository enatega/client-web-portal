'use client';
// queries

//interfaces
import IEditDeleteInterface from '@/lib/utils/interfaces/edit-delete.interface';

//components

//icons
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//contexts

//hooks
import { useEffect, useRef } from 'react';

export default function EditDeletePopup({
  setIsDeleting,
  setIsEditing,
  setVisible,
  visible,
}: IEditDeleteInterface) {
  //states
  //popup ref
  const popupRef = useRef<HTMLDivElement | null>(null);

  //handle blur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
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
      className="flex flex-col gap-2 p-3 rounded-lg right-0 bg-white shadow-xl border-gray-400 border w-8 sticky h-16 items-center justify-center"
    >
      <button onClick={setIsEditing}>
        <FontAwesomeIcon
          color="blue"
          icon={faEdit}
          width={15}
          className="cursor-pointer"
        />
      </button>
      <button onClick={setIsDeleting}>
        <FontAwesomeIcon
          color="red"
          width={15}
          icon={faTrash}
          className="cursor-pointer"
        />
      </button>
    </div>
  );
}
