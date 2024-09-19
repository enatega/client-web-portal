// Core
import { useRef, useState } from 'react';

// PrimeReact Components
import { Checkbox } from 'primereact/checkbox';
import { OverlayPanel } from 'primereact/overlaypanel';

// FontAwesome Icons
import { faAdd } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import CustomTextField from '@/lib/ui/useable-components/input-field';
import TextComponent from '@/lib/ui/useable-components/text-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';

// Styles
import classes from './banner.module.css';

interface IBannersHeaderProps {
  globalFilterValue: string;
  onGlobalFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedActions: string[];
  setSelectedActions: (actions: string[]) => void;
  setIsAddBannerVisible: (visible: boolean) => void;
}

export default function BannersHeader({
  globalFilterValue,
  onGlobalFilterChange,
  selectedActions,
  setSelectedActions,
  setIsAddBannerVisible,
}: IBannersHeaderProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const overlayPanelRef = useRef<OverlayPanel>(null);

  // Handle checkbox toggle
  const toggleAction = (action: string) => {
    const updatedActions = selectedActions.includes(action)
      ? selectedActions.filter((a) => a !== action)
      : [...selectedActions, action];
    setSelectedActions(updatedActions);
  };

  const menuItems = [
    {
      label: 'Open Modal',
      value: 'openModal',
    },
    {
      label: 'Navigate',
      value: 'navigate',
    },
  ];

  return (
    <div className="flex flex-col mx-[-15px] mb-4 gap-6">
      <div className="flex w-full justify-between">
        <TextComponent className="text-4xl font-bold" text="Banners" />
        <TextIconClickable
          className="sm:w-auto bg-black text-white border-gray-300 rounded"
          icon={faAdd}
          iconStyles={{ color: 'white' }}
          title="Add Banner"
          onClick={() => setIsAddBannerVisible(true)}
        />
      </div>

      <div className="w-fit flex flex-colm:flex-row items-center gap-2">
        <CustomTextField
          type="text"
          name="vendorFilter"
          maxLength={35}
          showLabel={false}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
        />
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
                {menuItems
                  .filter((item) =>
                    item.label.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className={`${classes.filter} flex justify-between items-center my-2`}
                    >
                      <div className="flex">
                        <Checkbox
                          inputId={`action-${item.value}`}
                          checked={selectedActions.includes(item.value)}
                          onChange={() => toggleAction(item.value)}
                          className={`${classes.checkbox}`}
                        />
                        <label
                          htmlFor={`action-${item.value}`}
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
                onClick={() => setSelectedActions([])}
              >
                Clear filters
              </p>
            </div>
          </OverlayPanel>

          <TextIconClickable
            className="border border-dotted border-[#E4E4E7] rounded text-black w-20"
            icon={faAdd}
            iconStyles={{ color: 'black' }}
            title={selectedActions.length > 0 ? 'Filter' : 'Action'}
            onClick={(e) => overlayPanelRef.current?.toggle(e)}
          />
        </div>
      </div>
    </div>
  );
}
