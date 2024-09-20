//components
import CustomActionActionButton from '@/lib/ui/useable-components/custom-action-button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import CustomTextField from '@/lib/ui/useable-components/input-field';

//icons
import { faPlus } from '@fortawesome/free-solid-svg-icons';

//prime react
import { FilterMatchMode } from 'primereact/api';

//hooks
import { ChangeEvent, useState } from 'react';

export default function WithdrawRequestScreen() {
  //filters
  const [filters, setFilters] = useState({
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  //global filters change
  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center px-5 w-full">
        <HeaderText text="Withdraw Requests" className="mx-5" />
      </div>
      <div className="self-start flex items-center justify-center gap-x-3 m-3">
        <CustomTextField
          name="searchQuery"
          onChange={onGlobalFilterChange}
          value={globalFilterValue}
          showLabel={false}
          placeholder="Filter tasks..."
          type="text"
          className="w-app-bar-search-width h-custom-button"
        />
        <CustomActionActionButton
          Icon={faPlus}
          title="Action"
          handleOptionChange={() => {}}
          selectedOption={null}
          statusOptions={[{ label: '', code: '' }]}
        />
      </div>
    </div>
  );
}
