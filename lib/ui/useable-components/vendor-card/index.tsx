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

export default function VendorCard({ index }: IVendorCardProps) {
  // Context
  const { vendorId, onSetVendorId } = useContext(VendorContext);

  // Handlers
  const onVendorCardClicked = (_vendorId: number) => {
    onSetVendorId(_vendorId);
    onUseLocalStorage('save', 'vendorId', _vendorId.toString());
  };

  return (
    <RippleComponent onClick={() => onVendorCardClicked(index)}>
      <div
        className={`flex items-center  bg-${vendorId === index ? 'black' : 'white'} p-2 px-3 cursor-pointer`}
      >
        <img
          src="https://placehold.co/40x40"
          alt="User avatar"
          className="rounded-full mr-3"
        />
        <div className="flex-1 flex flex-col gap-y-1">
          <TextComponent
            className={`card-h2 text-${vendorId === index ? 'white' : 'black'}`}
            text="Cody fisher"
          />

          <TextComponent
            className={`card-h3 text-${vendorId === index ? 'white' : 'black'}`}
            text="cody.fisher@example.com"
          />

          <div
            className={`w-fit px-1 rounded-md flex gap-x-2 items-center bg-${vendorId === index ? 'primary-color' : 'gray-100'}`}
          >
            <FontAwesomeIcon
              icon={faShop}
              color={vendorId === index ? 'white' : 'black'}
              size="xs"
            />
            <span
              className={`card-h2 text-${vendorId === index ? 'white' : 'black'}`}
            >
              5
            </span>
          </div>
        </div>
        <FontAwesomeIcon icon={faEllipsisV} color="white" size="lg" />
      </div>
    </RippleComponent>
  );
}
