// Interface
import { IStatsCardProps } from '@/lib/utils/interfaces';

// Styles
import { formatCurrency } from '@/lib/utils/methods';
import classes from './stats-card.module.css';

export default function StatsCard({
  label,
  total,
  description,
}: IStatsCardProps) {
  return (
    <div className={`${classes['card']}`}>
      <div className="flex flex-col justify-between items-start gap-y-2">
        {/* <h2 className="text-lg font-semibold ">{label}</h2> */}
        <div className="w-[217px] opacity-70 text-[#202224] text-xl font-medium leading-7">
          {label}
        </div>

        <div className="w-[217px] text-[#202224] text-4xl font-semibold  leading-10">
          {formatCurrency(total)}
        </div>

        <span className="text-[#00b69b] text-sm font-medium font-['Inter'] leading-7">
          {description}
        </span>
      </div>
    </div>
  );
}
