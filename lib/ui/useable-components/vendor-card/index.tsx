import { IVendorCardProps } from '@/lib/utils/interfaces';
import { faEllipsisV, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function VendorCard({ index }: IVendorCardProps) {
  const selected = index === 0;

  return (
    <div
      className={`flex items-center mb-4 bg-${selected ? 'black' : 'white'} p-2 px-3 `}
    >
      <img
        src="https://placehold.co/40x40"
        alt="User avatar"
        className="rounded-full mr-3"
      />
      <div className="flex-1 flex flex-col gap-y-1">
        <div className={`font-bold text-${selected ? 'white' : 'black'}`}>
          Cody fisher
        </div>
        <div className={`text-sm text-${selected ? 'white' : 'black'}`}>
          cody.fisher@example.com
        </div>
        <div
          className={`w-fit px-2 rounded-md flex gap-x-2 items-center bg-${selected ? 'sb-item-primary-color' : 'gray-100'}`}
        >
          <FontAwesomeIcon
            icon={faShop}
            color={selected ? 'white' : 'black'}
            size="sm"
          />
          <span className={`text-${selected ? 'white' : 'black'}`}>5</span>
        </div>
      </div>
      <FontAwesomeIcon icon={faEllipsisV} color="white" size="lg" />
    </div>
  );
}
