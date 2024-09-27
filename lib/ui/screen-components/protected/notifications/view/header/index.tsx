import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { INotificationHeaderProps } from '@/lib/utils/interfaces/notification.interface';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

export default function NotificationHeader({
  handleButtonClick,
}: INotificationHeaderProps) {
  return (
    <div className="w-full flex-shrink-0 sticky top-0 bg-white z-10 shadow-sm p-3">
      <div className="flex w-full justify-between">
      <HeaderText text="Notification" />
      <TextIconClickable
        icon={faAdd}
        iconStyles={{ color: 'white' }}
        onClick={handleButtonClick}
        title="Send Notification"
        className="sm:w-auto bg-black text-white border-gray-300 rounded"
      />
    </div>
    </div>
  );
}
