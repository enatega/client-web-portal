// Interface and Types
import { ICommissionRateScreenHeaderProps } from '@/lib/utils/interfaces/commission-rate.interface';

// Components
import HeaderText from '@/lib/ui/useable-components/header-text';

const CommissionRateHeader = ({
}: ICommissionRateScreenHeaderProps) => {
  return (
    <div className="w-full flex-shrink-0">
      <div className="flex w-full justify-between">
        <HeaderText className="heading" text="Commission Rates" />
      </div>
    </div>
  );
};

export default CommissionRateHeader;
