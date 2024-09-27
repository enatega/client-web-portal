import ConfigHeader from '@/lib/ui/screen-components/protected/configuration/view/header';
import ConfigMain from '@/lib/ui/screen-components/protected/configuration/view/main';

export default function ConfigurationsScreen() {
  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <ConfigHeader />
      <ConfigMain />
    </div>
  );
}
