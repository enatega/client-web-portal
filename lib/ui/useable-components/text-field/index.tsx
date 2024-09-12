import { ITextComponentProps } from '@/lib/utils/interfaces';
import { twMerge } from 'tailwind-merge';

export default function TextComponent({
  text,
  className,
}: ITextComponentProps) {
  return (
    <div
      className={twMerge(
        'text-xs font-normal leading-6 custom-text',
        className
      )}
    >
      {text}
    </div>
  );
}
