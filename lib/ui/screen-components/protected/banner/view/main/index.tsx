import CustomTextField from '@/lib/ui/useable-components/input-field';
import Table from '@/lib/ui/useable-components/table';
import TextComponent from '@/lib/ui/useable-components/text-field';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import {
  IBannersMainComponentsProps,
  IBannerToggleComponentProps,
} from '@/lib/utils/interfaces/banner.interface';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { FilterMatchMode } from 'primereact/api';
import { Checkbox } from 'primereact/checkbox';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef, useState } from 'react';
import classes from './main.module.css';
// Banner image rendering component
const BannerImage = (product: IBannerToggleComponentProps) => {
  return <Image width={40} height={40} alt="Banner" src={product.image} />;
};

// Table columns
const COLUMNS = [
  { headerName: 'Image', propertyName: 'image', body: BannerImage },
  { headerName: 'Title', propertyName: 'title' },
  { headerName: 'Description', propertyName: 'description' },
  { headerName: 'Screen Name', propertyName: 'screenName' },
  { headerName: 'Action', propertyName: 'action' },
];

export default function BannersMain({
  setIsAddBannerVisible,
}: IBannersMainComponentsProps) {
  const [selectedProducts, setSelectedProducts] = useState<
    IBannerToggleComponentProps[]
  >([]);
  const [data] = useState<IBannerToggleComponentProps[]>([
    {
      _id: 'oaids',
      image:
        'https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=2688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'dummy@gmail.com',
      description: 'dummy',
      screenName: '+92333333333',
      action: 'Open Modal',
    },
    {
      _id: 'jai',
      image:
        'https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=2688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'dummy2@gmail.com',
      description: 'dummy2',
      screenName: '+92333333334',
      action: 'Navigate',
    },
    {
      _id: 'ask',
      image:
        'https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=2688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'dummy2@gmail.com',
      description: 'dummy2',
      screenName: '+92333333334',
      action: 'Navigate',
    },
  ]);

  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilterValue(e.target.value);
  };

  // Handle checkbox toggle
  const toggleAction = (action: string) => {
    const updatedActions = selectedActions.includes(action)
      ? selectedActions.filter((a) => a !== action)
      : [...selectedActions, action];
    setSelectedActions(updatedActions);
  };

  const filteredDataCount = (action: string) =>
    data.filter((item) => item.action === action).length;

  const menuItems = [
    {
      label: 'Open Modal',
      value: 'Open Modal',
      count: filteredDataCount('Open Modal'),
    },
    {
      label: 'Navigate',
      value: 'Navigate',
      count: filteredDataCount('Navigate'),
    },
  ];

  // Setting up filters
  const filters = {
    global: { value: globalFilterValue, matchMode: FilterMatchMode.CONTAINS },
    action: {
      value: selectedActions.length > 0 ? selectedActions : null,
      matchMode: FilterMatchMode.IN,
    },
  };

  const header = (
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
          {/* Filter button */}
          <OverlayPanel ref={overlayPanelRef} dismissable>
            <div className="w-60">
              <div className="mb-3">
                <CustomTextField
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search"
                  className="w-full"
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
                      <div className="flex gap-2">
                        <Checkbox
                          inputId={`action-${item.value}`}
                          checked={selectedActions.includes(item.value)}
                          onChange={() => toggleAction(item.value)}
                        />
                        <label
                          htmlFor={`action-${item.value}`}
                          className="ml-2"
                        >
                          {item.label}
                        </label>
                      </div>
                      <span>{item.count}</span>
                    </div>
                  ))}
              </div>
              <p
                className="mt-3 text-center"
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

  return (
    <div className="p-2 pt-5">
      <Table
        header={header}
        data={data}
        filters={filters}
        setSelectedData={setSelectedProducts}
        selectedData={selectedProducts}
        columns={COLUMNS}
      />
    </div>
  );
}
