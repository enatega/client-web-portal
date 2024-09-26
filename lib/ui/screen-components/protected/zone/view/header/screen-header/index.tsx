// Components
import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { IZoneHeaderProps } from '@/lib/utils/interfaces';

const ZoneHeader = ({ setIsAddZoneVisible }: IZoneHeaderProps) => {
  return (
    <div className="w-full flex-shrink-0">
      <div className="flex w-full justify-between">
        <HeaderText text="Zone" />
        <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Zone"
          onClick={() => setIsAddZoneVisible(true)}
        />
      </div>
    </div>
  );
};

export default ZoneHeader;
