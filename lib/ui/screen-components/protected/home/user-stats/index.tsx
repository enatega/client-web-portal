import StatsCard from '@/lib/ui/useable-components/stats-card';
import { dummyStatsData } from '@/lib/utils/dummy';
import { IStatsCardProps } from '@/lib/utils/interfaces';

export default function UserStats() {
  const renderStatsCard = (data: IStatsCardProps, index: number) => (
    <StatsCard {...data} key={index} />
  );

  return (
    <div className="grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {dummyStatsData.map(renderStatsCard)}
    </div>
  );
}
