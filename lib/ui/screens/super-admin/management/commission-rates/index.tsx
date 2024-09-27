import CommissionRateMain from '@/lib/ui/screen-components/protected/commissionRate/view/main';
import HeaderText from '@/lib/ui/useable-components/header-text';

export default function CommissionRateScreen() {
  return (
    <div className="screen-container">
      <div className="w-full flex-shrink-0 sticky top-0 bg-white z-10 shadow-sm p-3">
        <div className="flex w-full justify-between">
          <HeaderText
            className="heading text-sm md:text-2xl"
            text="Commission Rate"
          />
        </div>
      </div>
      <CommissionRateMain />
    </div>
  );
}
