// Interface
import { IStatsCardProps } from '@/lib/utils/interfaces';

// Styles
import { formatCurrency } from '@/lib/utils/methods';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

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
          <i className="fas fa-users text-gray-400"></i>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="text-2xl font-semibold"> {formatCurrency(total)}</div>
        <div className="text-green-500 text-sm"> {description}</div>
      </div>
    </Link>
  );
}
