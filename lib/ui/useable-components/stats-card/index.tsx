// Interface
import { IStatsCardProps } from '@/lib/utils/interfaces';

// Styles
import classes from './state-card.module.css';

export default function StatsCard({
  label,
  total,
  description,
}: IStatsCardProps) {
  return (
    <div className={`${classes['card']}`}>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{label}</h2>
          <p className="text-3xl font-bold">{total}</p>
          <p className="text-green-500 flex items-center">
            <i className="fas fa-arrow-up mr-1"></i> {description}
          </p>
        </div>
        <div className="text-2xl text-gray-400">
          <i className="fas fa-store"></i>
        </div>
      </div>
    </div>
  );
}
