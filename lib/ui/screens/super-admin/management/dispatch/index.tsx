//components
import DispatchHeader from '@/lib/ui/screen-components/protected/dispatch/view/header/screen-header';
import DispatchMain from '@/lib/ui/screen-components/protected/dispatch/view/main';

export default function DispatchScreen() {
  return (
    <div className="screen-container">
      <DispatchHeader />
      <div className="flex-grow overflow-y-auto">
        <DispatchMain />
      </div>
    </div>
  );
}
