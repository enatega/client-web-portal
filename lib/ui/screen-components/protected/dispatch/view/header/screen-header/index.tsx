import HeaderText from '@/lib/ui/useable-components/header-text';

export default function DispatchHeader() {
  return (
    <div className="w-full flex-shrink-0 sticky top-0 bg-white z-10 shadow-sm p-3">
      <div className="flex w-full justify-between">
        <HeaderText text="Dispatch" />
      </div>
    </div>
  );
}
