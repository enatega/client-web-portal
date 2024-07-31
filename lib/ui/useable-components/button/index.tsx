// Interfaces
import { ICustomButtonProps } from '@/lib/utils/interfaces';

import { Button } from 'primereact/button';

// Styles
import classes from './button.module.css';

export default function CustomButton({
  className,
  label,
  onClick,
  ...props
}: ICustomButtonProps) {
  return (
    <Button
      className={`${classes['btn-custom']} ${className}`}
      label={label}
      onClick={onClick}
      {...props}
    ></Button>
  );
}
