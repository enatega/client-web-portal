// Custom Components
import CustomTextField from '@/lib/ui/useable-components/input-field';

// Interfaces
import { IRidersTableHeaderProps } from '@/lib/utils/interfaces';

export default function RidersTableHeader({
  globalFilterValue,
  onGlobalFilterChange,
}: IRidersTableHeaderProps) {
  return (
    <div className="flex flex-col mb-4 gap-6">
      <div className="w-fit flex flex-colm:flex-row items-center gap-2">
        <div className="w-60">
          <CustomTextField
            type="text"
            name="vendorFilter"
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