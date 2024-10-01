//components
import WithdrawRequestHeader from '@/lib/ui/screen-components/protected/withdraw-requests/view/header/screen-header';
import WithdrawRequestsMain from '@/lib/ui/screen-components/protected/withdraw-requests/view/main';

export default function WithdrawRequestScreen() {
  return (
    <div className="screen-container">
      <WithdrawRequestHeader />
      <WithdrawRequestsMain />
    </div>
  );
}
