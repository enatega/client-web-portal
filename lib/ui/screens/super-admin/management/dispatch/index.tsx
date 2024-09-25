//components
import DispatchHeader from '@/lib/ui/screen-components/protected/dispatch/view/header';
import DispatchMain from '@/lib/ui/screen-components/protected/dispatch/view/main';

export default function DispatchScreen() {
  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <DispatchHeader />
      <div className="flex-grow overflow-y-auto">
        <DispatchMain />
      </div>
    </div>
  );
}
