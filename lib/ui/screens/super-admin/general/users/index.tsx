import UserHeader from '@/lib/ui/screen-components/protected/users/view/header/screen-header';
import UsersMain from '@/lib/ui/screen-components/protected/users/view/main';

export default function UsersScreen() {
  return (
    <div className="flex flex-col h-[90vh] overflow-auto">
      <UserHeader />

      <UsersMain />
    </div>
  );
}
