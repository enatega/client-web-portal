import NotificationTable from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/notifications/NotificationTable';
import SendNotification from '@/lib/ui/screen-components/protected/layout/super-admin-layout/management/notifications/SendNotification';
import CustomActionActionButton from '@/lib/ui/useable-components/custom-action-button';
import GlobalButton from '@/lib/ui/useable-components/custom-icon-button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';

export default function NotificationsScreen() {
  const [visible, setVisible] = useState(false);
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
            <InputText placeholder="Filter tasks..." className="p-2" />
            <CustomActionActionButton Icon={faPlus} title="Action" />
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
