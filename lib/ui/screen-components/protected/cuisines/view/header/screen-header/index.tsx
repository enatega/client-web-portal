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
    <div className="w-full flex-shrink-0 sticky top-0 bg-white z-10 shadow-sm p-3">
      <div className="flex w-full justify-between">
        <HeaderText text="Cuisines" />
        <TextIconClickable
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          onClick={handleButtonClick}
          title="Add Cuisine"
          className="rounded border-gray-300 bg-black text-white sm:w-auto"
        />
      </div>
    </div>
  );
}
