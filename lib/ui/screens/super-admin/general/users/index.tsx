import UserHeader from '@/lib/ui/screen-components/protected/users/view/header';
import UsersMain from '@/lib/ui/screen-components/protected/users/view/main';

export default function UsersScreen() {
  return (
    <div className="px-10 pt-5">
      <UserHeader />
      <UsersMain />
    </div>
  );
}
