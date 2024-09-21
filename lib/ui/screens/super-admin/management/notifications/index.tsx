//components
import NotificationTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/notifications/NotificationTable';
import SendNotification from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/notifications/SendNotification';
import CustomActionActionButton from '@/lib/ui/useable-components/custom-action-button';
import GlobalButton from '@/lib/ui/useable-components/custom-icon-button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import CustomTextField from '@/lib/ui/useable-components/input-field';

//icons
import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';

//prime react
import { FilterMatchMode } from 'primereact/api';
import { Sidebar } from 'primereact/sidebar';

//hooks
import { ChangeEvent, useState } from 'react';

export default function NotificationsScreen() {
  //states
  const [visible, setVisible] = useState(false);

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
    <div className="flex flex-col items-center w-full justify-between">
      <div className="flex justify-between items-center px-5 w-full">
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          position="right"
        >
          <SendNotification setVisible={setVisible} />
        </Sidebar>

        <div className="flex flex-col gap-1 items-center justify-start">
          <HeaderText text="Notification" className="self-start" />
          <div className="flex gap-1 items-center justify-start">
            <CustomTextField
              name="searchQuery"
              onChange={onGlobalFilterChange}
              value={globalFilterValue}
              showLabel={false}
              placeholder="Filter tasks..."
              type="text"
              className="w-72 h-custom-button"
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

        <div className="flex items-center px-5 ">
          <GlobalButton
            Icon={faCirclePlus}
            title="Send Notification"
            setVisible={setVisible}
          />
        </div>
      </div>
      <NotificationTable />
    </div>
  );
}
