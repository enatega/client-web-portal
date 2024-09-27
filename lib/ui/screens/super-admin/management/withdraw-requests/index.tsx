//components
import WithdrawRequestHeader from '@/lib/ui/screen-components/protected/withdraw-requests/view/header';
import WithdrawRequestsMain from '@/lib/ui/screen-components/protected/withdraw-requests/view/main';

export default function WithdrawRequestScreen() {
  return (
    <div className="screen-container">
      <WithdrawRequestHeader />
      <div className="flex-grow overflow-y-auto">
        <WithdrawRequestsMain />
      </div>
    </div>
  );
}
