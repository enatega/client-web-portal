import NotificationHeader from '@/lib/ui/screen-components/protected/notifications/view/header';
import NotificationMain from '@/lib/ui/screen-components/protected/notifications/view/main';
import { useState } from 'react';

export default function NotificationsScreen() {
  //states
  const [visible, setVisible] = useState(false);
  // handle button click
  const handleButtonClick = () => {
    setVisible(true);
  };
  return (
    <div className="flex flex-col mb-3 gap-6 overflow-y-auto h-full">
      <NotificationHeader handleButtonClick={handleButtonClick} />
      <NotificationMain visible={visible} setVisible={setVisible} />
    </div>
  );
}
