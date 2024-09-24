// Core
import { useState } from 'react';

// Components

// Interfaces and Types

import OptionsAddForm from '@/lib/ui/screen-components/protected/options/add-form';
import OptionsHeader from '@/lib/ui/screen-components/protected/options/view/header/screen-header';
import OptionsMain from '@/lib/ui/screen-components/protected/options/view/main';
import { ICategoryResponse } from '@/lib/utils/interfaces';

export default function CategoryScreen() {
  // State
  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);
  const [category, setCategory] = useState<ICategoryResponse | null>(null);

  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <OptionsHeader setIsAddCategoryVisible={setIsAddCategoryVisible} />
      <div className="flex-grow overflow-y-auto">
        <OptionsMain
          setIsAddCategoryVisible={setIsAddCategoryVisible}
          setCategory={setCategory}
        />
      </div>

      <OptionsAddForm
        category={category}
        onHide={() => {
          setIsAddCategoryVisible(false);
          setCategory(null);
        }}
        isAddCategoryVisible={isAddCategoryVisible}
      />
    </div>
  );
}
