import { GlobalButtonPropsType } from '@/app/types/global-types';
import { Button } from 'primereact/button';

export default function GlobalActionButton({
  Icon,
  title,
}: GlobalButtonPropsType) {
  return (
    <Button className="py-2 px-3 border-dashed border-[#272727] rounded-md flex gap-3 items-center justify-center hover:bg-[#27272723]">
      <span>
        <Icon size={20} color="#272727fd" />
      </span>
      <span className="text-[#272727fd]">{title}</span>
    </Button>
  );
}
