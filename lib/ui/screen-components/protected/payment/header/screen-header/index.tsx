// Components
import HeaderText from '@/lib/ui/useable-components/header-text';

const PaymentHeader = () => {
  return (
    <div className="w-full flex-shrink-0 sticky top-0 bg-white z-10 shadow-sm p-3">
      <div className="flex w-full justify-between">
        <HeaderText  text="Payments" />
      </div>
    </div>
  );
};

export default PaymentHeader;
