//components
import DispatchHeader from '@/lib/ui/screen-components/protected/dispatch/view/header';
import DispatchMain from '@/lib/ui/screen-components/protected/dispatch/view/main';

export default function DispatchScreen() {
  return (
    <div className="flex flex-col mb-3 gap-6 overflow-y-auto h-full">
      <DispatchHeader />
      <DispatchMain />
    </div>
  );
}
