import { TextIconClickableProps } from '@/lib/utils/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ripple } from 'primereact/ripple';

// Styles
import classes from './text-icon-clickable.module.css';

export default function TextIconClickable({
  className,
  icon,
  title = '',
  iconStyles,
  onClick,
}: TextIconClickableProps) {
  return (
    <div
      className={`flex items-center space-x-2 cursor-pointer p-ripple ${className}`}
      onClick={onClick}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} color={iconStyles?.color ?? 'gray'} />
      )}
      <span className={classes['label']}>{title}</span>
      <Ripple />
    </div>
  );
}
