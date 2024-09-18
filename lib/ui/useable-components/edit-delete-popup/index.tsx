'use client';
import { DELETE_COUPON, DELETE_CUISINE } from '@/lib/api/graphql/mutations';
import { ToastContext } from '@/lib/context/toast.context';
import IEditDeleteInterface, {
  IEditDeleteProps,
} from '@/lib/utils/interfaces/edit-delete.interface';
import { useMutation } from '@apollo/client';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useRef, useState } from 'react';
import DeleteDialog from '../delete-dialog';

export default function EditDeletePopup<T extends IEditDeleteProps>({
  setIsEditDeletePopupOpen,
  data,
  type,
}: IEditDeleteInterface<T>) {
  //states
  const [isDeleting, setIsDeleting] = useState({ _id: '', bool: false });
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

  //handle delete icon click
  const handleDeleteClick = () => {
    console.log({ msg: 'Delete called', data: data._id });
    setIsDeleting(() => ({
      _id: data?._id,
      bool: true,
    }));
    setIsEditDeletePopupOpen({
      _id: '',
      bool: false,
    });
  };
  //delete queries
  const [deleteCoupon] = useMutation(DELETE_COUPON);
  const [deleteCuisine] = useMutation(DELETE_CUISINE);

  //toast
  const { showToast } = useContext(ToastContext);

  //handle delete
  async function deleteItem() {
    console.log({ msg: 'called del func' });
    try {
      //coupon
      if (type === 'coupon') {
        await deleteCoupon({
          variables: {
            _id: isDeleting._id,
          },
        });
        showToast({
          type: 'success',
          message: 'Coupon deletion was successfull',
          life: 2000,
        });
      } else if (type === 'cuisine') {
        await deleteCuisine({
          variables: {
            _id: isDeleting._id,
          },
        });
        showToast({
          type: 'success',
          message: 'Cuisine deletion was successfull',
          life: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      showToast({
        type: 'error',
        message: 'An unknown error occured, please try again',
        life: 2000,
      });
    }
  }
  useEffect(() => {
    console.log({ isDeleting });
  }, [isDeleting]);
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
      <button onClick={handleDeleteClick}>
        <FontAwesomeIcon
          color="red"
          width={15}
          icon={faTrash}
          className="cursor-pointer"
        />
      </button>
      {/* Delete Dailog  */}
      <DeleteDialog
        onConfirm={deleteItem}
        visible={isDeleting.bool}
        onHide={() => setIsDeleting({ _id: '', bool: false })}
      />
    </div>
  );
}
