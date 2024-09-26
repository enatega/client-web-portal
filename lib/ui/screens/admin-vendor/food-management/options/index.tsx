// Core
import { useState } from 'react';

// Components
import OptionsAddForm from '@/lib/ui/screen-components/protected/options/add-form';
import OptionsHeader from '@/lib/ui/screen-components/protected/options/view/header/screen-header';
import OptionsMain from '@/lib/ui/screen-components/protected/options/view/main';

// Interfaces and Types
import { IOptions } from '@/lib/utils/interfaces/options.interface';

export default function OptionsScreen() {
  // State
  const [isAddOptionsVisible, setIsAddOptionsVisible] = useState(false);
  const [option, setOption] = useState<IOptions | null>(null);

  return (
    <div className="flex h-screen flex-col overflow-hidden p-3">
      <OptionsHeader setIsAddOptionsVisible={setIsAddOptionsVisible} />
      <div className="flex-grow overflow-y-auto">
        <OptionsMain
          setIsAddOptionsVisible={setIsAddOptionsVisible}
          setOption={setOption}
        />
      </div>

      <OptionsAddForm
        option={option}
        onHide={() => {
          setIsAddOptionsVisible(false);
          setOption(null);
        }}
        isAddOptionsVisible={isAddOptionsVisible}
      />
    </div>
  );
}
