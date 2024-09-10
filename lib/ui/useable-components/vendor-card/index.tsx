import { IVendorCardProps } from '@/lib/utils/interfaces';
import { faEllipsisV, faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextComponent from '../text-field';

export default function VendorCard({ index }: IVendorCardProps) {
  const selected = index === 0;

  return (
    <div
      className={`flex items-center  bg-${selected ? 'black' : 'white'} p-2 px-3 `}
    >
      <img
        src="https://placehold.co/40x40"
        alt="User avatar"
        className="rounded-full mr-3"
      />
      <div className="flex-1 flex flex-col gap-y-1">
        <TextComponent
          className={`card-h1 text-${selected ? 'white' : 'black'}`}
          text="Cody fisher"
        />

        <TextComponent
          className={`card-h2 text-${selected ? 'white' : 'black'}`}
          text="cody.fisher@example.com"
        />

        <div
          className={`w-fit px-1 rounded-md flex gap-x-2 items-center bg-${selected ? 'primary-color' : 'gray-100'}`}
        >
          <FontAwesomeIcon
            icon={faShop}
            color={selected ? 'white' : 'black'}
            size="xs"
          />
          <span className={`card-h2 text-${selected ? 'white' : 'black'}`}>
            5
          </span>
        </div>
      </div>
      <FontAwesomeIcon icon={faEllipsisV} color="white" size="lg" />
    </div>
  );
}
