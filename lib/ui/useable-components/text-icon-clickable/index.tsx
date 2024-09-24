// Utilities

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
      className={`text-icon-clickable-container ${className} flex items-center justify-center`}
      onClick={onClick}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} color={iconStyles?.color ?? 'gray'} />
      )}
      <span>{title}</span>
      <Ripple />
    </div>
  );
}
