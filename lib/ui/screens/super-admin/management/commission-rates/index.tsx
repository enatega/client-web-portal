import CommissionRateMain from '@/lib/ui/screen-components/protected/commissionRate/view/main';
import HeaderText from '@/lib/ui/useable-components/header-text';

export default function CommissionRateScreen() {
  return (
    <div className="px-6 overflow-y-auto flex flex-col h-screen">
      <div className="flex flex-col mt-6 mb-4 gap-6">
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
