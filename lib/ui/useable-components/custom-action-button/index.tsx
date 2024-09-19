import { IGlobalButtonProps } from '@/lib/utils/interfaces/action.button.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';

export default function CustomActionActionButton({
  Icon,
  title,
}: IGlobalButtonProps) {
  return (
    <Button className="py-2 px-3 border-dashed border-[#272727] rounded-md flex gap-3 items-center justify-center hover:bg-[#27272723]">
      <span>
        <FontAwesomeIcon icon={Icon} size="1x" />
      </span>
      <span className="text-[#272727fd]">{title}</span>
    </Button>
  );
}
