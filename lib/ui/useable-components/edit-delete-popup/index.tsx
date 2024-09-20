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
import { useEffect, useRef } from 'react';

export default function EditDeletePopup<T>({
  setIsDeleting,
  setIsEditing,
  setVisible,
  visible,
  data,
}: IEditDeleteInterface<T>) {
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
      className="flex flex-col gap-2 p-2 rounded-lg right-8  bg-white shadow-xl border border-gray-200 w-fit absolute"
    >
      <button
        onClick={() =>
          setIsEditing({
            bool: true,
            data: data,
          })
        }
      >
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
        }}
      >
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
