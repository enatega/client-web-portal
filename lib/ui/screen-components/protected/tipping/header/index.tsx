// Interface and Types

// Components
import HeaderText from '@/lib/ui/useable-components/header-text';

const TippingHeader = () => {
  return (
    <div className="w-full flex-shrink-0">
      <div className="flex w-full justify-between">
        <HeaderText text="Tipping" />
      </div>
    </div>
  );
};

export default TippingHeader;
