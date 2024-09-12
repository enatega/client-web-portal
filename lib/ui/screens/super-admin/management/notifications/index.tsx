import GlobalActionButton from '@/lib/ui/useable-components/global-buttons/action-button';
import GlobalButton from '@/lib/ui/useable-components/global-buttons/button';
import HeaderText from '@/lib/ui/useable-components/header-text';
import { InputText } from 'primereact/inputtext';
import { IoIosAddCircleOutline } from 'react-icons/io';

export default function NotificationsScreen() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-between items-center px-5 w-full">
        <div className="flex flex-col gap-1 items-center justify-start">
          <HeaderText text="Notification" className="self-start" />
          <div className="flex gap-1 items-center justify-start">
            <InputText placeholder="Filter tasks..." />
            <GlobalActionButton Icon={IoIosAddCircleOutline} title="Action" />
          </div>
        </div>
        <GlobalButton Icon={IoIosAddCircleOutline} title="Send Notification" />
      </div>
    </div>
  );
}
