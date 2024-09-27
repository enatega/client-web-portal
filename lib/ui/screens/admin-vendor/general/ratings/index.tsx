// Components
import RatingHeader from '@/lib/ui/screen-components/protected/ratings/header/screen-header';

export default function RatingScreen() {
  return (
    <div className="flex flex-col p-3 h-screen overflow-hidden">
      <RatingHeader />
      <div className="flex-grow overflow-y-auto"></div>
    </div>
  );
}
