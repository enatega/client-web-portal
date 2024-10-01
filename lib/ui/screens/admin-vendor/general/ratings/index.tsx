// Components
import RatingHeader from '@/lib/ui/screen-components/protected/ratings/header/screen-header';

export default function RatingScreen() {
  return (
    <div className="flex h-screen flex-col overflow-hidden p-3">
      <RatingHeader />
      <div className="flex-grow overflow-y-auto"></div>
    </div>
  );
}
