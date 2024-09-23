import HeaderText from '@/lib/ui/useable-components/header-text';

export default function WithdrawRequestHeader() {
  return (
    <div className="flex justify-between items-center p-2 w-full">
      <HeaderText text="Withdraw Requests" className="mx-5" />
    </div>
  );
}
