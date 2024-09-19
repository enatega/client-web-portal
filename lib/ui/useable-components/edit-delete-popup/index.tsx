'use client';
// queries

//interfaces
import IEditDeleteInterface, {
  IEditDeleteProps,
} from '@/lib/utils/interfaces/edit-delete.interface';

//components

//icons
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//contexts

//hooks
import { useEffect, useRef, useState } from 'react';

export default function EditDeletePopup<T extends IEditDeleteProps>({
  setIsEditDeletePopupOpen,
  data,
}: IEditDeleteInterface<T>) {
  //states
  const [, setIsDeleting] = useState({ _id: '', bool: false });
  const [, setIsEditing] = useState({ data: {}, bool: false });

  //popup ref
  const popupRef = useRef<HTMLDivElement | null>(null);

  //handle blur
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
      className="flex flex-col gap-2 p-2 rounded-lg right-8  bg-white shadow-xl border border-gray-200 w-fit absolute"
    >
      <button
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
        className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded transition-colors"
      >
        <FontAwesomeIcon
          title="Edit"
          icon={faEdit}
          className="w-4 h-4 text-gray-600"
        />
        <span className="text-sm">Edit</span>
      </button>
      <button
        onClick={() => setIsDeleting({ _id: data._id, bool: true })}
        className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded transition-colors"
      >
        <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-red-500" />
        <span className="text-sm text-red-500">Delete</span>
      </button>
    </div>
  );
}
