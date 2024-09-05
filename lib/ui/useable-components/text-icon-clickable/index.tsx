import { TextIconClickableProps } from '@/lib/utils/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Ripple } from 'primereact/ripple';

export default function TextIconClickable({
  className,
  icon,
  title = '',
}: TextIconClickableProps) {
  return (
    <div
      className={`flex items-center space-x-1 cursor-pointer p-ripple ${className}`}
    >
      {icon && <FontAwesomeIcon icon={icon} color="gray" />}
      <span>{title}</span>
      <Ripple />
    </div>
  );
}
