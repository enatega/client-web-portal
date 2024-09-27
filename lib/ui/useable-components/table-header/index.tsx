import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { OverlayPanel } from 'primereact/overlaypanel';
import CustomTextField from '../input-field';
import TextIconClickable from '../text-icon-clickable';
import { useRef, useState } from 'react';
import { ITableHeaderProps } from '@/lib/utils/interfaces';

export default function TableHeader({
  // statusOptions,
  // setFilters,
  onGlobalFilterChange,
  globalFilterValue,
}: ITableHeaderProps) {
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  // const [selectedStatus, setSelectedStatus] = useState<string[]>(['all']);

  // const toggleAction = (action: string, checked: boolean) => {
  //   let updatedSelectedStatus = [...selectedStatus];

  //   if (checked) {
  //     // Remove 'all' if selecting any other option
  //     if (action !== 'all') {
  //       updatedSelectedStatus = updatedSelectedStatus.filter(
  //         (status) => status !== 'all'
  //       );
  //     }
  //     updatedSelectedStatus.push(action);
  //   } else {
  //     // Deselect the option
  //     updatedSelectedStatus = updatedSelectedStatus.filter(
  //       (status) => status !== action
  //     );
  //   }

  //   // If no specific option is selected, reset to 'all'
  //   if (
  //     updatedSelectedStatus.length === 0 ||
  //     (updatedSelectedStatus.length === 1 && updatedSelectedStatus.includes('all'))
  //   ) {
  //     updatedSelectedStatus = ['all'];
  //   }

  //   let updatedStatusValue = '';
  //   if (updatedSelectedStatus.includes('enabled') && updatedSelectedStatus.includes('disabled')) {
  //     updatedStatusValue = '';
  //   } else if (updatedSelectedStatus.includes('enabled')) {
  //     updatedStatusValue = 'true';
  //   } else if (updatedSelectedStatus.includes('disabled')) {
  //     updatedStatusValue = 'false';
  //   }

  //   setSelectedStatus(updatedSelectedStatus);
  //   setFilters?.((prev: IFilterType) => ({
  //     ...prev,
  //     status: { value: updatedStatusValue, matchMode: FilterMatchMode.EQUALS },
  //   }));
  // };

  return (
    <div className="mb-4 flex flex-col gap-6 pt-5">
    <div className="flex-colm:flex-row flex w-fit items-center gap-2">
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

            {/* <div className="border-b border-t py-1">
              {statusOptions.map((item: IDropdownSelectItem) => (
                <div
                  key={item.code}
                  className="flex justify-between items-center my-2"
                >
                  <div className={`flex ${classes.filter}`}>
                    <Checkbox
                      inputId={`action-${item.code}`}
                      onChange={(e) => toggleAction(item.code, e.checked??false)}
                      checked={selectedStatus.includes(item.code)}
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
            </div> */}

            {/* <p
              className="mt-3 text-center text-sm"
              onClick={() => {
                setSelectedStatus(['all']);
                setFilters?.((prev: IFilterType) => ({
                  ...prev,
                  status: { value: '', matchMode: FilterMatchMode.EQUALS },
                }));
              }}
            >
              Clear filters
            </p> */}
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
    </div>
  );
}
