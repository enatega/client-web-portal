// Component
import StatsCard from '@/lib/ui/useable-components/stats-card';

// Dummy
import { dummyOrderStatsData } from '@/lib/utils/dummy';

// Interface & Types
import { IStatsCardProps } from '@/lib/utils/interfaces';

export default function UserStats() {
  const renderStatsCard = (data: IStatsCardProps, index: number) => (
    <StatsCard {...data} key={index} />
  );

  return (
    <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {dummyOrderStatsData.map(renderStatsCard)}
    </div>
  );
}
