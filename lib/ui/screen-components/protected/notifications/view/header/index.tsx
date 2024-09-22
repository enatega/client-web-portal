import HeaderText from '@/lib/ui/useable-components/header-text';
import TextIconClickable from '@/lib/ui/useable-components/text-icon-clickable';
import { INotificationHeaderProps } from '@/lib/utils/interfaces/notification.interface';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

export default function NotificationHeader({
  handleButtonClick,
}: INotificationHeaderProps) {
  return (
    <div className="flex justify-between items-center p-2 w-full">
      <HeaderText text="Notification" />
      <TextIconClickable
        icon={faAdd}
        iconStyles={{ color: 'white' }}
        onClick={handleButtonClick}
        title="Send Notification"
        className="sm:w-auto bg-black text-white border-gray-300 rounded"
      />
    </div>
  );
}
