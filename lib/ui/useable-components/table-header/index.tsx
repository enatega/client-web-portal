import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { OverlayPanel } from 'primereact/overlaypanel';
//components
import CustomTextField from '../input-field';
import TextIconClickable from '../text-icon-clickable';
//prime react
import { useRef, useState } from 'react';
//css
import { ITableHeaderProps } from '@/lib/utils/interfaces';
import { Checkbox } from 'primereact/checkbox';
import classes from './index.module.css';

export default function TableHeader({
  statusOptions,
  setSelectedStatuses,
  selectedStatuses,
  onGlobalFilterChange,
  globalFilterValue,
}: ITableHeaderProps) {
  //refs
  const overlayPanelRef = useRef<OverlayPanel>(null);

  //states
  const [searchValue, setSearchValue] = useState('');

  // Handle checkbox toggle
  const toggleAction = (action: string) => {
    const updatedActions = selectedStatuses.includes(action)
      ? selectedStatuses.filter((s) => s !== action)
      : [...selectedStatuses, action];
    setSelectedStatuses(updatedActions);
  };

  return (
    <div className="w-fit flex flex-colm:flex-row items-center gap-2 mx-2 my-2">
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

      {/* ======================== */}
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
              {statusOptions
                .filter((item) =>
                  item.label.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className={` flex justify-between items-center my-2`}
                  >
                    <div className="flex">
                      <Checkbox
                        inputId={`action-${item.code}`}
                        checked={selectedStatuses.includes(item?.code)}
                        onChange={() => toggleAction(item.code)}
                        className={`${classes.checkbox}`}
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
              onClick={() => setSelectedStatuses([])}
            >
              Clear filters
            </p>
          </div>
        </OverlayPanel>

        <TextIconClickable
          className="border border-dotted border-[#E4E4E7] rounded text-black w-20"
          icon={faAdd}
          iconStyles={{ color: 'black' }}
          title={selectedStatuses.length > 0 ? 'Filter' : 'Action'}
          onClick={(e) => overlayPanelRef.current?.toggle(e)}
        />
      </div>
      {/* ======================== */}
    </div>
  );
}
