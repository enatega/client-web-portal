import IEditDeleteInterface from '@/lib/utils/interfaces/edit-delete.interface';
import { useEffect, useRef } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

export default function EditDeletePopup({
  setIsEditing,
  setIsDeleting,
  setIsEditDeletePopupOpen,
}: IEditDeleteInterface) {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
        setIsDeleting(false);
        setIsEditDeletePopupOpen({ bool: false, id: '' });
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
      className="flex flex-col gap-2 p-3 rounded-lg sticky right-0 bg-white shadow-xl border-gray-400 border"
    >
      <BiEdit
        color="blue"
        size={20}
        onClick={() => setIsEditing(true)}
        className="cursor-pointer"
      />
      <MdDelete
        color="red"
        size={20}
        onClick={() => setIsDeleting(true)}
        className="cursor-pointer"
      />
    </div>
  );
}
