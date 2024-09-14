import EditDeletePopup from '@/lib/ui/useable-components/edit-delete-popup';
import { ICouponsStakProps } from '@/lib/utils/interfaces/coupons.interface';
import { InputSwitch } from 'primereact/inputswitch';
import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export default function CouponStack({
  coupon,
  setSelectedData,
  selectedData,
}: ICouponsStakProps) {
  const [isEditDeletePopupOpen, setIsEditDeletePopupOpen] = useState({
    id: '',
    bool: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    let isAlreadySelected = selectedData.some((d) => d?._id === coupon?._id);
    isAlreadySelected && setIsSelected(true);
    if (isEditing || isDeleting) {
      setIsEditDeletePopupOpen({
        bool: false,
        id: '',
      });
    }
    if (isDeleting) {
      setIsEditing(false);
    }
    if (isEditing) {
      setIsDeleting(false);
    }
  }, [isEditing, isDeleting]);
  return (
    <tr className="flex w-full justify-between items-center text-start p-3">
      <td className="min-w-auto max-w-32">
        <input
          type="checkbox"
          name="selectOne"
          className="mr-3"
          checked={isSelected ? true : false}
        />
        {coupon?.__typename}
      </td>
      <td className="min-w-auto max-w-32">{coupon?.title}</td>
      <td className="min-w-auto max-w-32">{coupon?.discount}</td>
      <td className="min-w-auto max-w-32">
        <span className="flex items-center gap-1">
          {/* toggle  */}
          <InputSwitch checked={coupon?.enabled} />
          {/* three dots menu button  */}
          <BsThreeDotsVertical
            color="gray"
            className="cursor-pointer"
            size={20}
            onClick={() =>
              setIsEditDeletePopupOpen({ bool: true, id: coupon?._id })
            }
          />

          {/* Edit Delete Popup  */}
          {isEditDeletePopupOpen.bool &&
            isEditDeletePopupOpen.id === coupon?._id && (
              <EditDeletePopup
                setIsDeleting={setIsDeleting}
                setIsEditing={setIsEditing}
                setIsEditDeletePopupOpen={setIsEditDeletePopupOpen}
              />
            )}
        </span>
      </td>
    </tr>
  );
}
