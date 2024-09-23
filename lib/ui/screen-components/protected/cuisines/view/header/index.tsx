//components
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

//interfaces
import { ICuisineScreenHeaderProps } from '@/lib/utils/interfaces/cuisine.interface';

//icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';

export default function CuisineScreenHeader({
  handleButtonClick,
}: ICuisineScreenHeaderProps) {
  return (
    <div>
      <div className="flex justify-between items-center p-2 w-full">
        <HeaderText text="Cuisines" />
        <TextIconClickable
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          onClick={handleButtonClick}
          title="Add Cuisine"
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
        />
      </div>
    </div>
  );
}
