'use client';
//screen components
import CuisineScreenHeader from '@/lib/ui/screen-components/protected/cuisines/view/header';
import CuisinesMain from '@/lib/ui/screen-components/protected/cuisines/view/main';

//hooks
import { useState } from 'react';

export default function CuisinesScreen() {
  //states
  const [visible, setVisible] = useState(false);
  //toggle visibility
  const handleButtonClick = () => {
    setVisible(true);
  };

  return (
    <div className="flex flex-col mb-3 gap-6 overflow-y-auto h-full">
      <CuisineScreenHeader handleButtonClick={handleButtonClick} />
      <div className="flex-grow overflow-y-auto">
        <CuisinesMain setVisible={setVisible} visible={visible} />
      </div>
    </div>
  );
}
