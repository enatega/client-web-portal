//components
import WithdrawRequestHeader from '@/lib/ui/screen-components/protected/withdraw-requests/view/header';
import WithdrawRequestsMain from '@/lib/ui/screen-components/protected/withdraw-requests/view/main';

export default function WithdrawRequestScreen() {
  return (
    <div className="flex flex-col mb-3 gap-6 overflow-y-auto h-full">
      <WithdrawRequestHeader />
      <WithdrawRequestsMain />
    </div>
  );
}
