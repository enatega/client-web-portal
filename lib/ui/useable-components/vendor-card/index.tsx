// Core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';

// Context
import { VendorContext } from '@/lib/context/vendor.context';

// Interface
import { IVendorCardProps } from '@/lib/utils/interfaces';

// Methods
import { onUseLocalStorage } from '@/lib/utils/methods';

// Icons
import {
  faEdit,
  faEllipsisVertical,
  faShop,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

// Component
import CustomPopupMenu from '../popup-menu';
import TextComponent from '../text-field';

export default function VendorCard({
  _id,
  email,
  userType,
  totalRestaurants,
}: IVendorCardProps) {
  // Context
  const { vendorId, onSetVendorId } = useContext(VendorContext);
  const { onSetVendorFormVisible } = useContext(VendorContext);

  const [isEditPopupOpen, setIsEditDeletePopupOpen] = useState<boolean>(false);

  // Handlers
  const onVendorCardClicked = (_vendorId: string) => {
    onSetVendorId(_vendorId);
    onUseLocalStorage('save', 'vendorId', _vendorId.toString());
  };

  const onHandlerEdit = () => {
    onSetVendorFormVisible(true, true);
  };

  const onHandlerDelete = () => {};
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (!(e.target as HTMLElement).closest('.three-dots')) {
          onVendorCardClicked(_id);
        }
        setIsEditDeletePopupOpen(false);
      }}
      className="relative"
    >
      <div
        className={`flex items-center  bg-${vendorId === _id ? 'black' : 'white'} p-2 px-3 cursor-pointer`}
      >
        <img
          src="https://placehold.co/40x40"
          alt="User avatar"
          className="rounded-full mr-3"
        />
        <div className="flex-1 flex flex-col gap-y-1">
          <TextComponent
            className={`card-h2 text-${vendorId === _id ? 'white' : 'black'}`}
            text={userType}
          />

          <TextComponent
            className={`card-h3 text-${vendorId === _id ? 'white' : 'black'}`}
            text={email}
          />

          <div
            className={`w-fit px-1 rounded-md flex gap-x-2 items-center bg-${vendorId === _id ? 'primary-color' : 'gray-100'}`}
          >
            <FontAwesomeIcon
              icon={faShop}
              color={vendorId === _id ? 'white' : 'black'}
              size="xs"
            />
            <span
              className={`card-h2 text-${vendorId === _id ? 'white' : 'black'}`}
            >
              {totalRestaurants}
            </span>
          </div>
        </div>

        <div className="three-dots relative">
          {vendorId === _id && (
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className={`p-1 ${
                isEditPopupOpen ? 'text-gray-400' : 'text-white'
              } hover:scale-105 cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                setIsEditDeletePopupOpen(!isEditPopupOpen);
              }}
            />
          )}
          {isEditPopupOpen && (
            <div className="absolute top-full left-0 mt-1 -translate-x-full z-10">
              <CustomPopupMenu
                close={() => setIsEditDeletePopupOpen(false)}
                items={[
                  {
                    title: 'Edit',
                    icon: faEdit,
                    fn: onHandlerEdit,
                    data: vendorId,
                    color: 'text-gray-600',
                  },
                  {
                    title: 'Delete',
                    icon: faTrash,
                    fn: onHandlerDelete,
                    data: null,
                    color: 'text-red-500',
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
