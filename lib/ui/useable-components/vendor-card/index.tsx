// Core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';

// Context
import { VendorContext } from '@/lib/context/vendor.context';

// Interface
import { IVendorCardProps } from '@/lib/utils/interfaces';

// Methods
import { onUseLocalStorage } from '@/lib/utils/methods';

// Icons
import { faEllipsisV, faShop } from '@fortawesome/free-solid-svg-icons';

// Component
import RippleComponent from '../ripple';
import TextComponent from '../text-field';

export default function VendorCard({
  _id,
  email,
  userType,
  totalRestaurants,
}: IVendorCardProps) {
  // Context
  const { vendorId, onSetVendorId } = useContext(VendorContext);

  // Handlers
  const onVendorCardClicked = (_vendorId: string) => {
    onSetVendorId(_vendorId);
    onUseLocalStorage('save', 'vendorId', _vendorId.toString());
  };

  return (
    <RippleComponent onClick={() => onVendorCardClicked(_id)}>
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
        <FontAwesomeIcon
          icon={faEllipsisV}
          color={vendorId === _id ? 'white' : 'black'}
          size="lg"
        />
      </div>
    </RippleComponent>
  );
}
