// Components
import HeaderText from '@/lib/ui/useable-components/header-text';

const CommissionRateHeader = () => {
  return (
    <div className="w-full flex-shrink-0 sticky top-0 bg-white z-10 shadow-sm p-3">
      <div className="flex w-full justify-between">
        <HeaderText text="Commission Rates" />
      </div>
    </div>
  );
};

export default CommissionRateHeader;
