import { twMerge } from 'tailwind-merge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//
import { TextIconClickableProps } from '@/lib/utils/interfaces';

// Prime React
import { Ripple } from 'primereact/ripple';

export default function TextIconClickable({
  className,
  icon,
  title = '',
  iconStyles,
  onClick,
}: TextIconClickableProps) {
  return (
    <div
      className={`text-icon-clickable-container ${twMerge('text-sm flex items-center justify-center', className)}`}
      onClick={onClick}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} color={iconStyles?.color ?? 'gray'} />
      )}
      {title}
      <Ripple />
    </div>
  );
}
