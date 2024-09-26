// Core
import { useState } from 'react';

// Components

// Interfaces and Types

import CategoryAddForm from '@/lib/ui/screen-components/protected/category/add-form';
import CategoryHeader from '@/lib/ui/screen-components/protected/category/view/header/screen-header';
import CategoryMain from '@/lib/ui/screen-components/protected/category/view/main';
import { ICategory } from '@/lib/utils/interfaces';

export default function CategoryScreen() {
  // State
  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);
  const [category, setCategory] = useState<ICategory | null>(null);

  return (
    <div className="flex h-screen flex-col overflow-hidden p-3">
      <CategoryHeader setIsAddCategoryVisible={setIsAddCategoryVisible} />
      <div className="flex-grow overflow-y-auto">
        <CategoryMain
          setIsAddCategoryVisible={setIsAddCategoryVisible}
          setCategory={setCategory}
        />
      </div>

      <CategoryAddForm
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
