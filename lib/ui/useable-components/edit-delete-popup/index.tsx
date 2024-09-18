'use client';
// queries
import { DELETE_COUPON, DELETE_CUISINE } from '@/lib/api/graphql/mutations';

//interfaces
import IEditDeleteInterface, {
  IEditDeleteProps,
} from '@/lib/utils/interfaces/edit-delete.interface';

//components
import DeleteDialog from '../delete-dialog';

//icons
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//contexts
import { ToastContext } from '@/lib/context/toast.context';

//hooks
import { useMutation } from '@apollo/client';
import { useContext, useEffect, useRef, useState } from 'react';

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

  //toast
  const { showToast } = useContext(ToastContext);

  //delete queries
  const [deleteCoupon, { error: couponError }] = useMutation(DELETE_COUPON);
  const [deleteCuisine, { error: cuisineError }] = useMutation(DELETE_CUISINE);

  //handle delete
  async function deleteItem() {
    console.log({ mg: 'delete item called!', id: data._id, type });
    try {
      //coupon
      if (type === 'coupon') {
        await deleteCoupon({
          variables: {
            id: data._id,
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
            id: data._id,
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
        message:
          'An unknown error occured, please try again' ||
          couponError?.graphQLErrors[0].message ||
          cuisineError?.graphQLErrors[0].message,
        life: 2000,
      });
    }
  }
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
      {/* Delete Dailog  */}
      <DeleteDialog
        visible={isDeleting.bool}
        onConfirm={deleteItem}
        onHide={() => setIsDeleting({ _id: '', bool: false })}
      />
    </div>
  );
}
