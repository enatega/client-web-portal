// Core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

// Interface
import { IStatsCardProps } from '@/lib/utils/interfaces';

// Methods
import { formatCurrency } from '@/lib/utils/methods';

export default function StatsCard({
  label,
  total,
  description,
  icon,
  route,
}: IStatsCardProps) {
  return (
    <Link href={route}>
      <div className="card cursor-pointer">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">{label}</span>

          {icon && <FontAwesomeIcon icon={icon} />}
        </div>
        <div className="text-2xl font-semibold"> {formatCurrency(total)}</div>
        <div className="text-green-500 text-sm"> {description}</div>
      </div>
    </Link>
  );
}
