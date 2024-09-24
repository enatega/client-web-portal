// Interface and Types
import { IBannersHeaderComponentsProps } from '@/lib/utils/interfaces/banner.interface';

// Components
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const BannersHeader = ({
  setIsAddBannerVisible,
}: IBannersHeaderComponentsProps) => {
  return (
    <div className="w-full flex-shrink-0">
      <div className="flex w-full justify-between">
        <HeaderText text="Banners" />
        <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Banner"
          onClick={() => setIsAddBannerVisible(true)}
        />
      </div>
    </div>
  );
};

export default BannersHeader;
