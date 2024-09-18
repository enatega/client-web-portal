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
  const [isDeleting, setIsDeleting] = useState({ _id: '', bool: false });
  //temporary console
  console.log(isDeleting);
  const [isEditing, setIsEditing] = useState({ data: {}, bool: false });
  console.log({ isEditing });

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
      className="flex flex-col gap-2 p-3 rounded-lg right-0 bg-white shadow-xl border-gray-400 border w-8 sticky h-16 items-center justify-center"
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
      >
        <FontAwesomeIcon
          color="blue"
          icon={faEdit}
          width={15}
          className="cursor-pointer"
        />
      </button>
      <button onClick={() => setIsDeleting({ _id: data._id, bool: true })}>
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
