import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { OverlayPanel } from 'primereact/overlaypanel';
import CustomTextField from '../input-field';
import TextIconClickable from '../text-icon-clickable';
import { useRef, useState } from 'react';
import { ITableHeaderProps } from '@/lib/utils/interfaces';
import { Checkbox } from 'primereact/checkbox';
import classes from './index.module.css';
import { FilterMatchMode } from 'primereact/api';

export default function TableHeader({
  statusOptions,
  setFilters,
  onGlobalFilterChange,
  globalFilterValue,
}: ITableHeaderProps) {
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleAction = (action: string) => {
    const updatedStatuses = selectedStatuses.includes(action)
      ? selectedStatuses.filter((s) => s !== action)
      : [...selectedStatuses, action];

    setSelectedStatuses(updatedStatuses);

    const updatedStatusValue =
      updatedStatuses.length === 0 ? '' : updatedStatuses.join(',');

    if (setFilters) {
      setFilters((prev) => ({
        ...prev,
        status: {
          value: updatedStatusValue,
          matchMode: FilterMatchMode.EQUALS,
        },
      }));
    }
  };

  return (
    <div className="w-fit flex flex-col sm:flex-row items-center gap-2 mx-2 my-2">
      <div className="w-60">
        <CustomTextField
          name="searchQuery"
          onChange={onGlobalFilterChange}
          value={globalFilterValue}
          showLabel={false}
          placeholder="Filter tasks..."
          type="text"
          className="w-full"
        />
      </div>

      <div className="flex items-center">
        <OverlayPanel ref={overlayPanelRef} dismissable>
          <div className="w-60">
            <div className="mb-3">
              <CustomTextField
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
                className="w-full h-8"
                type="text"
                name="search"
                showLabel={false}
              />
            </div>

            <div className="border-b border-t py-1">
              {statusOptions.map((item) => (
                <div
                  key={item.code}
                  className="flex justify-between items-center my-2"
                >
                  <div className={`flex ${classes.filter}`}>
                    <Checkbox
                      inputId={`action-${item.code}`}
                      onChange={() => toggleAction(item.code)}
                      checked={selectedStatuses.includes(item.code)}
                      className={`${classes.checkbox} p-checkbox p-checkbox-box`}
                    />
                    <label
                      htmlFor={`action-${item.code}`}
                      className="ml-1 text-sm"
                    >
                      {item.label}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <p
              className="mt-3 text-center text-sm"
              onClick={() => {
                setSelectedStatuses([]);
                if (setFilters) {
                  setFilters((prev) => ({
                    ...prev,
                    status: { value: '', matchMode: FilterMatchMode.EQUALS },
                  }));
                }
              }}
            >
              Clear filters
            </p>
          </div>
        </OverlayPanel>

        <TextIconClickable
          className="border border-dotted border-[#E4E4E7] rounded text-black w-20"
          icon={faAdd}
          iconStyles={{ color: 'black' }}
          title="Filter"
          onClick={(e) => overlayPanelRef.current?.toggle(e)}
        />
      </div>
    </div>
  );
}
