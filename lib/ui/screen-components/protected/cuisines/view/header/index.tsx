import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { ICuisineScreenHeaderProps } from '@/lib/utils/interfaces/cuisine.interface';
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
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
        />
      </div>
    </div>
  );
}
