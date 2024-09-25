// Interface and Types
import { IPaymentHeaderProps } from '@/lib/utils/interfaces';

// Components
import HeaderText from '@/lib/ui/useable-components/header-text';

const PaymentHeader = ({ setIsAddPaymentVisible }: IPaymentHeaderProps) => {
  return (
    <div className="w-full flex-shrink-0">
      <div className="flex w-full justify-between">
        <HeaderText className="heading" text="Payments" />
        {/* <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Payment"
          onClick={() => setIsAddPaymentVisible(true)}
        /> */}
      </div>
    </div>
  );
};

export default PaymentHeader;
