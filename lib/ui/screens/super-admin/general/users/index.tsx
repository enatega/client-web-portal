import UserHeader from '@/lib/ui/screen-components/protected/users/view/header/screen-header';
import UsersMain from '@/lib/ui/screen-components/protected/users/view/main';

export default function UsersScreen() {
  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <UserHeader />
      <div className="flex-grow overflow-y-auto">
        <UsersMain />
      </div>
    </div>
  );
}
