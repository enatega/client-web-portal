import { IGlobalButtonProps } from '@/lib/utils/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
export default function GlobalButton({
  Icon,
  title,
  setVisible,
}: IGlobalButtonProps) {
  return (
    <Button
      className="bg-black py-2 px-3 rounded-md flex gap-3 items-center justify-center hover:bg-[#272727]"
      onClick={() => setVisible(true)}
    >
      <span>
        <FontAwesomeIcon icon={Icon} size="1x" color="white" />
      </span>
      <span className="text-white">{title}</span>
    </Button>
  );
}
