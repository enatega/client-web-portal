import ConfigHeader from '@/lib/ui/screen-components/protected/configuration/view/header';
import ConfigMain from '@/lib/ui/screen-components/protected/configuration/view/main';

export default function ConfigurationsScreen() {
  return (
    <div className="screen-container">
      <ConfigHeader />
      <ConfigMain />
    </div>
  );
}
