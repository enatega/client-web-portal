//Components
import TippingAddForm from '@/lib/ui/screen-components/protected/tipping/add-form/add-form';
import TippingHeader from '@/lib/ui/screen-components/protected/tipping/header';

export default function TippingScreen() {
  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <TippingHeader />
      <div className="flex-grow overflow-y-auto">
        <TippingAddForm />
      </div>
    </div>
  );
}
