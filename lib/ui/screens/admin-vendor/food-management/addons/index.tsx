// Core
import { useState } from 'react';

// Components
import AddonsAddForm from '@/lib/ui/screen-components/protected/add-on/add-form';
import AddonsHeader from '@/lib/ui/screen-components/protected/add-on/view/header/screen-header';
import AddonsMain from '@/lib/ui/screen-components/protected/add-on/view/main';

// Interfaces and Types
import { IAddon } from '@/lib/utils/interfaces/add-on.interface';

export default function AddonsScreen() {
  // State
  const [isAddAddonVisible, setIsAddAddonVisible] = useState(false);
  const [addon, setAddon] = useState<IAddon | null>(null);

  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <AddonsHeader setIsAddAddonVisible={setIsAddAddonVisible} />
      <div className="flex-grow overflow-y-auto">
        <AddonsMain
          setIsAddAddonVisible={setIsAddAddonVisible}
          setAddon={setAddon}
        />
      </div>

      <AddonsAddForm
        addon={addon}
        onHide={() => {
          setIsAddAddonVisible(false);
          setAddon(null);
        }}
        isAddAddonVisible={isAddAddonVisible}
      />
    </div>
  );
}
