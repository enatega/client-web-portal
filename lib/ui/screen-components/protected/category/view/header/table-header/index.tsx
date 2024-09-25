// Custom Components
import CustomTextField from '@/lib/ui/useable-components/input-field';

// Interfaces
import { ICategoryTableHeaderProps } from '@/lib/utils/interfaces';

export default function CategoryTableHeader({
  globalFilterValue,
  onGlobalFilterChange,
}: ICategoryTableHeaderProps) {
  return (
    <div className="flex flex-col mb-4 gap-6">
      <div className="w-fit flex flex-colm:flex-row items-center gap-2">
        <div className="w-60">
          <CustomTextField
            type="text"
            name="categoryilter"
            maxLength={35}
            showLabel={false}
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </div>
      </div>
    </div>
  );
}
