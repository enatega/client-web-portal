import CustomTextField from '@/lib/ui/useable-components/input-field';
import { IZoneTableHeaderProps } from '@/lib/utils/interfaces';
import React from 'react';

export default function ZoneTableHeader({
  globalFilterValue,
  onGlobalFilterChange,
}: IZoneTableHeaderProps) {
  return (
    <div className="flex flex-col mb-4 gap-6">
      <div className="w-fit flex flex-colm:flex-row items-center gap-2">
        <div className="w-60">
          <CustomTextField
            type="text"
            name="zoneFilter"
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
