import CustomTextField from '@/lib/ui/useable-components/input-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { ICommissionRateHeaderProps } from '@/lib/utils/interfaces';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from 'primereact/checkbox';
import { OverlayPanel } from 'primereact/overlaypanel';
import React, { useRef, useState } from 'react';
import classes from './commissionRateHeader.module.css';

interface MenuItem {
  label: string;
  value: string;
}

const CommissionRateHeader: React.FC<ICommissionRateHeaderProps> = ({
  setSelectedActions,
  selectedActions,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const overlayPanelRef = useRef<OverlayPanel>(null);

  const toggleAction = (action: string) => {
    setSelectedActions((prevActions: string[]) =>
      prevActions.includes(action)
        ? prevActions.filter((a: string) => a !== action)
        : [...prevActions, action]
    );
  };

  const menuItems: MenuItem[] = [
    { label: 'More than 5%', value: 'More than 5%' },
    { label: 'More than 10%', value: 'More than 10%' },
    { label: 'More than 20%', value: 'More than 20%' },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col mb-4 gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex flex-row sm:flex-col w-full sm:w-auto items-center gap-4">
          <div className="sm:hidden">
            <TextIconClickable
              className="border border-dotted border-[#E4E4E7] rounded-full w-10 h-10 flex items-center justify-center"
              icon={faAdd}
              iconStyles={{ color: 'black' }}
              onClick={(e) => overlayPanelRef.current?.toggle(e)}
            />
          </div>

          <CustomTextField
            type="text"
            name="vendorFilter"
            maxLength={35}
            className="w-64"
            showLabel={false}
            placeholder="Filter tasks..."
            value={searchValue}
            onChange={handleSearch}
          />
        </div>

        <div className="hidden sm:block">
          <TextIconClickable
            className="border border-dotted border-[#E4E4E7] rounded text-black w-44"
            icon={faAdd}
            iconStyles={{ color: 'black' }}
            title="Commission Rate"
            onClick={(e) => overlayPanelRef.current?.toggle(e)}
          />
        </div>

        <OverlayPanel ref={overlayPanelRef} dismissable>
          <div className="w-60">
            <div className="border-b border-t py-1">
              {menuItems
                .filter((item) =>
                  item.label.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className={`${classes.filter} flex justify-between items-center my-2`}
                  >
                    <div className="flex items-center ">
                      <Checkbox
                        inputId={`action-${item.value}`}
                        checked={selectedActions.includes(item.value)}
                        onChange={() => toggleAction(item.value)}
                        className={`${classes.checkbox}`}
                      />
                      <label
                        htmlFor={`action-${item.value}`}
                        className="ml-2 text-sm"
                      >
                        {item.label}
                      </label>
                    </div>
                  </div>
                ))}
            </div>
            <p
              className="mt-3 text-center text-sm cursor-pointer"
              onClick={() => setSelectedActions([])}
            >
              Clear filters
            </p>
          </div>
        </OverlayPanel>
      </div>
    </div>
  );
};

export default CommissionRateHeader;
