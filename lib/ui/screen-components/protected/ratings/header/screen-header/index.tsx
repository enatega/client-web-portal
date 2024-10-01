// Components
import HeaderText from '@/lib/ui/useable-components/header-text';

const RatingHeader = () => {
  return (
    <div className="w-full flex-shrink-0">
      <div className="flex w-full justify-between">
        <HeaderText className="heading" text="Ratings" />
      </div>
    </div>
  );
};

export default RatingHeader;
