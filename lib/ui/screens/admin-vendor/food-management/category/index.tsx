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
    <div className="screen-container">
      <CategoryHeader setIsAddCategoryVisible={setIsAddCategoryVisible} />

      <CategoryMain
        setIsAddCategoryVisible={setIsAddCategoryVisible}
        setCategory={setCategory}
      />

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
